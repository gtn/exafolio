import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {LOAD, SAVE} from 'redux-storage';
import * as consts from '/consts';
import * as lib from '/lib';
import loader from './loader';

const reduxFormReducer = combineReducers({
	form: formReducer
});


function isLoggedin(state = false, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return true;
		default:
			return state;
	}
}

function selectedCategoryId(state = 0, action) {
	switch (action.type) {
		case consts.SELECT_CATEGORY:
			return action.data;
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

function isLoading(state = 0, action) {
	switch (action.type) {
		case LOAD:
			return 0;
		case consts.LOADING_START:
			return state + 1;
		case consts.LOADING_FINISHED:
			return state > 0 ? state - 1 : 0;
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

function pageItemDetails(state = {}, action) {
	if (action.type == consts.SWITCH_PAGE && action.page == 'itemdetails') {
		return {...state, ...action.data};
	} else {
		return state;
	}
}

function pageAddItem(state = {}, action) {
	if (action.type == consts.SWITCH_PAGE && action.page == 'additem') {
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

function changedetails(state = {}, action) {
	switch (action.type) {
		case consts.CHANGE_DETALIS:
			return action.data;
		default:
			return state;
	}
}

function addItem(state = {}, action) {
	switch (action.type) {
		case consts.ADD_ITEM:
			return action.data;
		default:
			return state;
	}
}

function DeleteItem(state = {}, action) {
	switch (action.type) {
		case consts.DELETE_ITEM:
			return action.data;
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

function portfolioCategoriesById(state = null, action) {
	switch (action.type) {
		case LOAD:
			return {};
		case consts.PORTFOLIO_CATEGORIES_LOADED:
			let categoriesById = {};
			action.categories.forEach((category) => categoriesById[category.id] = category);

			return categoriesById;
		default:
			return state;
	}
}

function portfolioCategoriesReload(state = true, action) {
	switch (action.type) {
		case LOAD:
		case consts.CHANGE_DETAILS:
		case consts.ADD_ITEM:
		case consts.DELETE_ITEM:
			return true;
		case consts.PORTFOLIO_CATEGORIES_LOADED:
			return false;
		default:
			return state;
	}
}

let pages = combineReducers({
	login: pageLogin,
	coursedetail: clearOnLoggout(pageCourseDetail),
	itemdetails: clearOnLoggout(pageItemDetails),
	additem: clearOnLoggout(pageAddItem),
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
			form: formReducer,
		},
		clearOnLoggout({
			isLoggedin,
			user,
			moodleconfig,
			tokens,
			portfolioCategoriesById,
			portfolioCategoriesReload,
			selectedCategoryId,
			isLoading,
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
		if (['home', 'itemdetails', 'additem'].indexOf(state.currentPage) < 0) {
			state.currentPage = 'home';
		}
	}

	return state;
}
