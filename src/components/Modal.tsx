import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

export interface Props {
	dispatch?: (...args) => void,
	header: string,
};

export default class Modal extends Component<Props,{}> {
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
