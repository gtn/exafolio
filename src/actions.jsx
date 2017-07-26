import webservice from '/webservice';
import * as consts from '/consts';

export function loading(fnc) {
	return (dispatch, getState) => {
		dispatch({
			type: consts.LOADING_START,
		});

		return Promise.all([fnc(dispatch, getState)])
			.then((res) => {
				dispatch({
					type: consts.LOADING_FINISHED,
				});

				return res[0];
			})
			.catch((e) => {
				dispatch({
					type: consts.LOADING_FINISHED,
				});

				throw e;
			});
	}
}

export function login(form, formData) {
	return dispatch => {
		return webservice.login(formData)
			.then(data => {
				if (data.user && data.config) {
					data.moodleconfig = data.config;
					delete data.config;

					// index by id
					let tokens = {};
					data.tokens.forEach((token) => tokens[token.service] = token);
					data.tokens = tokens;

					form.setState({loading: false, error: null, fieldValues: {}});
					dispatch(setConfig({lastUsername: data.user.username}));
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

export function loadPortfolioCategories() {
	return (dispatch, getState) => {
		getState().portfolioCategoriesReload
		&& dispatch(loading(
			() => webservice.wsfunction('block_exaport_get_all_items')
				.then(categories => dispatch({
					type: consts.PORTFOLIO_CATEGORIES_LOADED,
					categories
				}))
		));
	}
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
	return (dispatch, getState) => {
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

export function changeDetails(data) {
	return dispatch => {
		let p = Promise.resolve();

		if (data.file && data.file[0]) {
			var file = data.file[0];
			p = p
				.then(() => {
					return webservice.upload_file(file)
				})
				.then((ret) => {
					data.fileitemid = ret[0].itemid;
				});
		}
		delete data.file;

		return p
			.then(() => webservice.wsfunction('block_exaport_update_item', data))
			.then(data => dispatch({
				type: consts.CHANGE_DETAILS,
				data
			}));
	}
}

export function addItem(data) {
	return dispatch => {
		let p = Promise.resolve();

		if (data.file && data.file[0]) {
			var file = data.file[0];
			p = p
				.then(() => webservice.upload_file(file))
				.then((ret) => {
					data.fileitemid = ret[0].itemid;
				});
		}
		delete data.file;

		return p
			.then(() => webservice.wsfunction('block_exaport_add_item', data))
			.then(data => dispatch({
				type: consts.ADD_ITEM,
				data
			}));
	};
}

export function deleteItem(data) {
	return dispatch =>
		webservice.wsfunction('block_exaport_delete_item', data)
			.then(data => dispatch({
				type: consts.DELETE_ITEM,
				data
			}));
}


export function switchPage(page, data = {}) {
	return {
		type: consts.SWITCH_PAGE,
		page,
		data
	};
}

export function selectCategory(categoryId) {
	return {
		type: consts.SELECT_CATEGORY,
		data: categoryId
	};
}
