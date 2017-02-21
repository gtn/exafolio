import {vsprintf} from 'sprintf-js';
import strings from './strings';

export function get_string(id, values = []) {
	if (!strings[id]) {
		return '{{' + id + '}}';
	}

	if (typeof strings[id] === 'function') {
		return strings[id].apply(null, values);
	}

	return vsprintf(strings[id], values);
}

export function trans() {
	return 'TODO';
}
