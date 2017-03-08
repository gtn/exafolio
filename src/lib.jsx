export function getDefaultSetting(name) {
	return window.exafolioConfig && window.exafolioConfig[name];
}

export function getDefaultMoodleUrl() {
	return getDefaultSetting('moodleUrl')
		|| document.location.href.replace(/\?.*/, '').replace(/\/exafolio\/*$/, '');
}

export function getVersion() {
	return '0.0.1';
}
