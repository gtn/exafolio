import {combineReducers} from 'redux';
import * as consts from '/consts';

function isLoggedin(state = false, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return true;
		case consts.LOGGEDOUT:
		case consts.LOGIN_ERROR:
			return false;
		default:
			return state;
	}
}

/*
function loginstate(state = {}, action) {
  switch (action.type) {
  case LOGINERROR:
    return action.error;
  default:
    return '';
  }
}
*/

function loginPage(state = {}, action) {
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

function courseDetailPage(state = {}, action) {
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
		case consts.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

function moodleconfig(state = {}, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return action.moodleconfig;
		case consts.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

function tokens(state = {}, action) {
	switch (action.type) {
		case consts.LOGGEDIN:
			return action.tokens;
		case consts.LOGGEDOUT:
			return {};
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

const pages = combineReducers({
	login: loginPage,
	coursedetail: courseDetailPage
});

const reducers = combineReducers({
	isLoggedin,
	user,
	config,
	moodleconfig,
	tokens,
	currentPage,
	pages
});

export default function rootReducer(oldState = {}, action) {
	let state = reducers(oldState, action);

	if (!state.isLoggedin) {
		// delete old data on logout
		state.user = {};
		state.moodleconfig = {};
		state.pages = {
			login: state.pages.login
		};

		if (state.currentPage != 'login' && state.currentPage != 'settings') {
			state.currentPage = 'home';
		}
	}

	return state;
}

/*
import {
	SELECT_REDDIT, INVALIDATE_REDDIT,
	REQUEST_POSTS, RECEIVE_POSTS
} from './actions';


function selectedReddit(state = 'reactjs', action) {
	switch (action.type) {
		case SELECT_REDDIT:
			return action.reddit;
		default:
			return state;
	}
}

function posts(state = {
	isFetching: false,
	didInvalidate: false,
	items: []
}, action) {
	switch (action.type) {
		case INVALIDATE_REDDIT:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_POSTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.posts,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

function postsByReddit(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_REDDIT:
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				[action.reddit]: posts(state[action.reddit], action)
			});
		default:
			return state;
	}
}

*/
