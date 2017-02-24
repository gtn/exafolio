import fetch from 'isomorphic-fetch';
import store from './store'

class webservice {
	moodleurl(suburl = '') {
		const state = store.getState();

		let moodleUrl = (state.config.moodleUrl || document.location.href);

		if (!moodleUrl.match(/(:\/\/|^\/)/)) {
			// not containing :// and not starting with /
			moodleUrl = 'http://' + moodleUrl;
		}

		moodleUrl = moodleUrl.replace(/(\/my)?\/+$/, '');
		return moodleUrl + suburl;
	}

	post(url, data = {}) {
		var form = new FormData()
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
			...data,
			services: 'moodle_mobile_app,exacompservices,exaportservices'
		})
			.then(req => req.json());
	}

	wsfunction(wsfunction, data = {}) {
		const state = store.getState();

		let wstoken = wsfunction.match(/^block_exaport_/) ? state.tokens.exaportservices : state.tokens.exacompservices;

		return this.post(this.moodleurl('/webservice/rest/server.php'), {
			...data,
			moodlewsrestformat: 'json',
			wstoken,
			wsfunction
		})
			.then(req => req.json())
			.then((response) => {
				if (response.exception) {
					throw new Error(JSON.stringify(response));
				}
				return response;
			});
	}
}

const wsInstance = new webservice();

export default wsInstance;
