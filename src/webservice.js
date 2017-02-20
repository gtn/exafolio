import fetch from 'isomorphic-fetch';
import store from './store'

class webservice {
	moodleurl(suburl = '') {
		const state = store.getState();
		return (state.config.moodleUrl || '').replace(/\/+$/, '') + suburl;
	}

	post(url, data = {}) {
		var form = new FormData()
		for (var key in data) {
			form.append(key, data[key]);
		}

		return fetch(url, {
			method: 'POST',
			body: form
		});
	}

	login(data) {
		return this.post(this.moodleurl('/blocks/exacomp/token.php'), {
			username: data.username,
			password: data.password
		})
			.then(req => req.json());
	}

	wsfunction(wsfunction, data = {}) {
		const state = store.getState();

		return this.post(this.moodleurl('/webservice/rest/server.php'), {
			...data,
			moodlewsrestformat: 'json',
			wstoken: state.moodleconfig.tokens.exacompservices,
			wsfunction
		})
			.then(req => req.json())
	}
}

const wsInstance = new webservice();

export default wsInstance;
