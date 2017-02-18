import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import {connect} from 'react-redux';
import * as actions from '../actions';

class CourseDetail extends Component {
	render() {
		return (
			<div>
				<h1>Course {this.props.course.fullname}</h1>
				<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
			</div>
		);
	}
}

export default connect(state => Object.assign({}, state.pages.coursedetail, {
	dispatch: state.dispatch
}))(CourseDetail);
