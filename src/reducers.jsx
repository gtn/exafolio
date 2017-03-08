import {combineReducers} from 'redux';
import { LOAD, SAVE } from 'redux-storage';
import * as consts from '/consts';
import * as lib from '/lib';

function isLoggedin(state = false, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return true;
		default:
			return state;
	}
}

function pageLogin(state = {}, action) {
	switch (action.type) {
		case consts.LOGIN_ERROR:
			return {...state, error: action.error};
		case consts.LOGGEDIN:
			return {...state, error: null};
		case LOAD:
			return {};
		default:
			return state;
	}
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
		return {...state, ...action.data};
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
		state.moodleUrl = lib.getDefaultMoodleUrl();
		state.moodleName = lib.getDefaultSetting('moodleName');
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
		case consts.PORTFOLIO_CATEGORIES_LOADED:
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
		case consts.PORTFOLIO_CATEGORIES_LOADED:
			let categoriesById = {};
			action.categories.forEach((category) => categoriesById[category.id] = category);

			return categoriesById;
		default:
			return state;
	}
}

let pages = combineReducers({
	login: pageLogin,
	coursedetail: clearOnLoggout(pageCourseDetail),
});

function clearOnLoggout(arg) {
	if (typeof arg == 'function') {
		let func = arg;
		return function (state = {}, action) {
			switch (action.type) {
				case consts.LOGGEDOUT:
				case consts.LOGIN_ERROR:
				case consts.CLEAR_USER_DATA:
					return func.call(this, undefined, action);
				default:
					return func.apply(this, arguments);
			}
		};
	}

	let reducers = arg, result = {};
	for (var key in reducers) {
		let func = reducers[key];

		result[key] = clearOnLoggout(func);
	}

	return result;
}

let reducers = combineReducers(
	Object.assign({
			config,
			currentPage,
			pages,
		},
		clearOnLoggout({
			isLoggedin,
			user,
			moodleconfig,
			tokens,
			portfolioCategoriesById,
			portfolioCategoryTree,
		})
	));


export default function rootReducer(oldState = {}, action) {
	// TODO: could test if oldState <> newState
	let state = Object.assign({}, reducers.apply(this, arguments));

	if (!state.isLoggedin) {
		if (['login', 'settings'].indexOf(state.currentPage) < 0) {
			state.currentPage = 'login';
		}
	} else {
		if (['home', 'course', 'courseDetail'].indexOf(state.currentPage) < 0) {
			state.currentPage = 'home';
		}
	}

	return state;
}
