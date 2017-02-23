import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';

export default class Menu extends Component {
	render() {
		return (
			<Drawer
				open={true} docked={true}
			containerStyle={{marginTop: '64px'}}>
				{this.props.children}
			</Drawer>
		);
	}
}

Menu.PageContent = class PageContent extends Component {
	render() {
		return (
			<div style={{marginLeft: '258px', marginTop: '64px'}}>
				{this.props.children}
			</div>
		);
	}
}
