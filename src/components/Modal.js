import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Modal extends Component {
	render() {
		return (
			<div className="exa-modal">
				{this.props.header &&
				(<div className="exa-modal-header">
					<Tabs inkBarStyle={{display: 'none'}}>
						<Tab label={this.props.header}>
						</Tab>
					</Tabs>
				</div>)}
				{this.props.children}
			</div>
		);
	}
}
