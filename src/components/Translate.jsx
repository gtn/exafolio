import React, { Component } from 'react';
import {get_string} from '/translate';

export default class Translate extends Component {
	render() {

		if (process.env.NODE_ENV !== 'production') {
			var infos = this.props;
		} else {
			var infos = {};
		}
		return <translated {...infos}>{get_string(this.props.id, this.props.values)}<br/></translated>;
	}
}
