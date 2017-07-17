import {Dispatch, DispatchProp} from 'react-redux';

declare global {
    interface Window { exafolioConfig: any; }
}

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

export function getPortfolioCategoryTree(categoriesById) {
	let rootChildren = [];

	Object.values(categoriesById).map((category) => {
		category.children = [];
	});

	Object.values(categoriesById).map((category) => {
		if (category.pid > 0 && categoriesById[category.pid]) {
			categoriesById[category.pid].children.push(category);
		} else {
			rootChildren.push(category);
		}
	});

	return rootChildren;
}

export interface DefaultProps extends DispatchProp<any> {
}
