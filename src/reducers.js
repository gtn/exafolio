import {combineReducers} from 'redux';
import {
	SELECT_REDDIT, INVALIDATE_REDDIT,
	REQUEST_POSTS, RECEIVE_POSTS
} from './actions';

import * as actions from './actions';

export function selectedReddit(state = 'reactjs', action) {
	switch (action.type) {
		case SELECT_REDDIT:
			return action.reddit;
		default:
			return state;
	}
}

export function isLoggedin(state = false, action) {
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
export function posts(state = {
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

export function postsByReddit(state = {}, action) {
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

export function loginPage(state = {}, action) {
	switch (action.type) {
		case actions.LOGIN_ERROR:
			return Object.assign({}, state, {
				error: action.error
			});
		case actions.LOGGEDIN:
			return Object.assign({}, state, {
				error: null
			});
		default:
			return state;
	}
}

export function currentPage(state = '', action) {
	switch (action.type) {
		case actions.SWITCH_PAGE:
			return action.page;
		default:
			return state;
	}
}

export function courseDetailPage(state = {}, action) {
	switch (action.type) {
		case actions.SWITCH_PAGE:
			return Object.assign({}, action.data);
		default:
			return state;
	}
}


export function user(state = {}, action) {
	switch (action.type) {
		case actions.LOGGEDIN:
			return Object.assign({}, action.user);
		case actions.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

export function moodleconfig(state = {}, action) {
	switch (action.type) {
		case actions.LOGGEDIN:
			return Object.assign({}, action.moodleconfig);
		case actions.LOGGEDOUT:
			return {};
		default:
			return state;
	}
}

export const pages = combineReducers({
	login: loginPage,
	coursedetail: courseDetailPage
});

/*
const rootReducer = combineReducers({
	isLoggedin,
	user,
	moodleconfig,
	currentPage,
	pages: combineReducers({
		login: loginPage,
		coursedetail: courseDetailPage
	}),
	postsByReddit,
	selectedReddit
});
export default rootReducer;
*/
