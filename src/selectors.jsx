import {connect} from 'react-redux';

export function pageSelector(state, page) {
	return state.pages[page];
}
