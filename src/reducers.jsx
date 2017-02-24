import {combineReducers} from 'redux';
import * as consts from '/consts';

function isLoggedin(state = false, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return true;
		default:
			return state;
	}
}

function pageLogin(state = {}, action) {
	return state;
}

function currentPage(state = '', action) {
	switch (action.type) {
		case consts.SWITCH_PAGE:
			return action.page;
		default:
			return state;
	}
}

function pageCourseDetail(state = {}, action) {
	if (action.type == consts.SWITCH_PAGE && action.page == 'coursedetail') {
		return Object.assign({}, state, action.data);
	} else {
		return state;
	}
}


function user(state = {}, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return action.user;
		default:
			return state;
	}
}

function moodleconfig(state = {}, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return action.moodleconfig;
		default:
			return state;
	}
}

function tokens(state = {}, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return action.tokens;
		default:
			return state;
	}
}

function config(state = {}, action) {
	if (!state.moodleUrl) {
		state.moodleUrl = document.location.href.replace(/\?.*/, '').replace(/\/exafolio\/*$/, '');
	}

	switch (action.type) {
		case consts.SET_CONFIG:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
}

function portfolioCategoryTree(state = [], action) {
	switch (action.type) {
		case consts.PORTFOLIO_ITEMS_LOADED:
			let categoriesById = {};
			let categoryTree = [];

			action.categories.forEach((category) => {
				categoriesById[category.id] = category;
				category.children = [];
			});

			action.categories.forEach((category) => {
				if (category.pid > 0 && categoriesById[category.pid]) {
					categoriesById[category.pid].children.push(category);
				} else {
					categoryTree.push(category);
				}
			});

			return categoryTree;
		default:
			return state;
	}
}

function portfolioCategoriesById(state = {}, action) {
	switch (action.type) {
		case consts.PORTFOLIO_ITEMS_LOADED:
			let categoriesById = {};
			action.categories.forEach((category) => categoriesById[category.id] = category);

			return categoriesById;
		default:
			return state;
	}
}

function clearOnLoggout(reducers) {
	let result = {};
	for (var key in reducers) {
		let func = reducers[key];

		result[key] = function (state = {}, action) {
			switch (action.type) {
				case consts.LOGGEDOUT:
				case consts.LOGIN_ERROR:
				case consts.CLEAR_USER_DATA:
					return func.call(this, undefined, action);
				default:
					return func.apply(this, arguments);
			}
		}
	}

	return result;
}

export default combineReducers(Object.assign({
	config,
	currentPage,
	pageLogin,
}, clearOnLoggout({
	isLoggedin,
	user,
	moodleconfig,
	tokens,
	portfolioCategoriesById,
	portfolioCategoryTree,
	pageCourseDetail,
})));
