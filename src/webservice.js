import fetch from 'isomorphic-fetch';
import store from './store'

class webservice {
	login(data) {
		var form = new FormData()
		form.append('username', data.username);
		form.append('password', data.password);

		return fetch('http://localhost/moodle30/blocks/exacomp/token.php', {
			method: 'POST',
			body: form
		})
			.then(req => req.json());
	}

	wsfunction(wsfunction, data = {}) {
		const state = store.getState();

		var form = new FormData()
		form.append('moodlewsrestformat', 'json');
		form.append('wstoken', state.moodleconfig.tokens.exacompservices);
		form.append('wsfunction', wsfunction);

		for (var key in data) {
			form.append(key, data[key]);
		}

		return fetch('http://localhost/moodle30/webservice/rest/server.php', {
			method: 'POST',
			body: form
		})
			.then(req => req.json())
	}
}

const wsInstance = new webservice();

export default wsInstance;
