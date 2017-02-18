import {combineReducers} from 'redux';
import {
	SELECT_REDDIT, INVALIDATE_REDDIT,
	REQUEST_POSTS, RECEIVE_POSTS
} from './actions';

import * as actions from './actions';

function selectedReddit(state = 'reactjs', action) {
	switch (action.type) {
		case SELECT_REDDIT:
			return action.reddit;
		default:
			return state;
	}
}

function isLoggedin(state = false, action) {
	switch (action.type) {
		case actions.LOGGEDIN:
			return true;
		case actions.LOGGEDOUT:
		case actions.LOGIN_ERROR:
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

function loginPage(state = {}, action) {
	switch (action.type) {
		case actions.LOGIN_ERROR:
			return Object.assign({}, state, {
				error: action.error
			});
		default:
			return state;
	}
}

function currentPage(state = '', action) {
	switch (action.type) {
		case actions.SWITCH_PAGE:
			return action.page;
		default:
			return state;
	}
}

function coursedetail(state = {}, action) {
	switch (action.type) {
		case actions.SWITCH_PAGE:
			return Object.assign({}, action.data);
		default:
			return state;
	}
}


function user(state = {}, action) {
	switch (action.type) {
		case actions.LOGGEDIN:
			return Object.assign({}, action.user);
		case actions.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

function moodleconfig(state = {}, action) {
	switch (action.type) {
		case actions.LOGGEDIN:
			return Object.assign({}, action.moodleconfig);
		case actions.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	isLoggedin,
	user,
	moodleconfig,
	currentPage,
	pages: combineReducers({
		login: loginPage,
		coursedetail
	}),
	postsByReddit,
	selectedReddit
});

export default rootReducer;
