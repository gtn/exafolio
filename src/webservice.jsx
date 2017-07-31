import fetch from 'isomorphic-fetch';
import store from './store'
import * as actions from '/actions';
import * as lib from '/lib';

class WebserviceException {
	constructor(data) {
		for (var key in data) {
			this[key] = data[key];
		}
	}
}

class Webservice {
	moodleurl(suburl = '') {
		const state = store.getState();

		let moodleUrl = (state.config.moodleUrl || lib.getDefaultMoodleUrl());

		if (!moodleUrl.match(/(:\/\/|^\/)/)) {
			// not containing :// and not starting with /
			moodleUrl = 'http://' + moodleUrl;
		}

		moodleUrl = moodleUrl.replace(/(\/my)?\/+$/, '');
		return moodleUrl + suburl;
	}

	post(url, data = {}) {
		// URLSearchParams instead of FormData
		// so content-type in the post request is application/x-www-form-urlencoded
		var form = new URLSearchParams()
		for (var key in data) {
			form.append(key, data[key]);
		}

		return fetch(url, {
			method: 'POST',
			body: form,
		});
	}

	login(data) {
		return this.post(this.moodleurl('/blocks/exaport/token.php'), {
			username: '',
			password: '',
			...data,
			services: 'moodle_mobile_app,exacompservices,exaportservices',
			app: 'exafolio',
			app_version: lib.getVersion(),
		})
			.then(req => req.json());
	}

	upload_file(file) {
		const state = store.getState();

		return this.post(this.moodleurl('/webservice/upload.php'), {
			token: state.tokens.moodle_mobile_app.token,
			filepath: '/',
			filearea: 'draft',
			file,
		})
			.then(req => req.json());
	}

	wsfunction(wsfunction, data = {}) {
		const state = store.getState();

		let wstoken = wsfunction.match(/^block_exaport_/) ? state.tokens.exaportservices.token : state.tokens.exacompservices.token;

		return this.post(this.moodleurl('/webservice/rest/server.php'), {
			...data,
			moodlewsrestformat: 'json',
			wstoken,
			wsfunction
		})
			.then(req => req.json())
			.then(response => {
				if (response.exception) {
					throw new WebserviceException(response);
				}
				return response;
			})
			.catch(exception => {
				if (exception instanceof WebserviceException && exception.errorcode == 'invalidtoken') {
					// invalidtoken
					store.dispatch(actions.loginError('login error'));
					return Promise.reject('login error');
				}

				throw exception;
			});
	}
}

const wsInstance = new Webservice();

export default wsInstance;
