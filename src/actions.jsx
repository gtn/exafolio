import webservice from '/webservice';
import * as consts from '/consts';

export function login(form, data) {
	return dispatch => {
		return webservice.login(data)
			.then(data => {
				if (data.user && data.config) {
					data.moodleconfig = data.config;
					delete data.config;

					form.setState({loading: false, error: null});
					dispatch(loginSuccess(data));
				} else {
					let error = data.error || 'wrong user/password';
					form.setState({loading: false, error});
					dispatch(loginError(error));
				}
			})
			.catch(() => {
				form.setState({loading: false, error: 'could not connect'});
				dispatch(loginError('could not connect dispatch'));
			});
	}
}

export function loadPortfolioItems() {
	return dispatch =>
		webservice.wsfunction('block_exaport_get_all_items')
			.then(categories => dispatch({
				type: consts.PORTFOLIO_ITEMS_LOADED,
				categories
			}));
}

export function loadCourses() {
	return dispatch =>
		webservice.wsfunction('dakora_get_courses')
			.then(courses => dispatch({
				type: consts.COURSES_LOADED,
				courses
			}));
}

export function loginError(error) {
	return {
		type: consts.LOGIN_ERROR,
		error: error
	};
};

export function loginSuccess(data) {
	return Object.assign(data, {
		type: consts.LOGGEDIN,
	});
};

export function logout() {
	return {
		type: consts.LOGGEDOUT,
	};
};

export function setConfig(data) {
	return {
		type: consts.SET_CONFIG,
		data
	};
};

export function testConnection(form) {
	return dispatch => {
		return webservice.login({testconnection: true})
			.then(data => {
				// call successful, probably got login error, but that's right
				form.setState({loading: false});
				dispatch(setConfig({moodleName: data.moodleName}));
				dispatch(switchPage('login'));
			})
			.catch(() => {
				// couldn't connect to server
				form.setState({loading: false, fieldErrors: {moodleUrl: 'could not connect'}});
			});
	}
};

export function switchPage(page, data = {}) {
	return {
		type: consts.SWITCH_PAGE,
		page,
		data
	};
}

/*
export function selectReddit(reddit) {
	return {
		type: SELECT_REDDIT,
		reddit
	};
}

export function invalidateReddit(reddit) {
	return {
		type: INVALIDATE_REDDIT,
		reddit
	};
}

function requestPosts(reddit) {
	return {
		type: REQUEST_POSTS,
		reddit
	};
}

function receivePosts(reddit, json) {
	return {
		type: RECEIVE_POSTS,
		reddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	};
}

function fetchPosts(reddit) {
	return dispatch => {
		dispatch(requestPosts(reddit));
		return fetch(`http://www.reddit.com/r/${reddit}.json`)
			.then(req => req.json())
			.then(json => dispatch(receivePosts(reddit, json)));
	}
}

function shouldFetchPosts(state, reddit) {
	const posts = state.postsByReddit[reddit];
	if (!posts) {
		return true;
	} else if (posts.isFetching) {
		return false;
	} else {
		return posts.didInvalidate;
	}
}

export function fetchPostsIfNeeded(reddit) {
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState(), reddit)) {
			return dispatch(fetchPosts(reddit));
		}
	};
}
*/

/*
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
*/

/*
export function login(data) {
	return dispatch => {
		var form = new FormData()
		form.append('service', 'moodle_mobile_app');
		form.append('username', data.username);
		form.append('password', data.password);
		var moodleToken = fetch('http://localhost/moodle30/login/token.php', {
			method: 'POST',
			body: form
		})
			.then(req => req.json());

		var form = new FormData()
		form.append('service', 'exacompservices');
		form.append('username', data.username);
		form.append('password', data.password);
		var exaportToken = fetch('http://localhost/moodle30/login/token.php', {
			method: 'POST',
			body: form
		})
			.then(req => req.json());

		let tokens;

		return Promise.all([
			moodleToken,
			exaportToken
		])
			.then((data) => {
					if (data[0].token && data[1].token) {
						dispatch(loadData({
							moodle: data[0].token,
							exacomp: data[1].token,
						}));
					} else if (data[0].token || data[1].token) {
						dispatch(loginError('wrong configuration'));
					} else {
						dispatch(loginError('wrong user/password'));
					}
				},
				(error) => {
					dispatch(loginError('could not connect'));
				});
	}
}

function loadData(tokens) {
	return (dispatch) => {
		var form = new FormData()
		form.append('moodlewsrestformat', 'json');
		form.append('wstoken', tokens.exacomp);
		form.append('wsfunction', 'dakora_get_login_data');

		return fetch('http://localhost/moodle30/webservice/rest/server.php', {
			method: 'POST',
			body: form
		})
			.then(req => req.json())
			.then(
				data => {
					data.moodleconfig = data.config;
					delete data.config;
					Object.assign(data.moodleconfig, {tokens})
					console.log(data);
					dispatch(loginSuccess(data));
				},
				(error) => dispatch(loginError('could not load userinfo'))
			);
	};
}

*/

