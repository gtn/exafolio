
export function pageSelector(state, page) {
	return state['page' + page.charAt(0).toUpperCase() + page.slice(1)];
}
