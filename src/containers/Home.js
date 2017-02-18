import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import {connect} from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
	componentDidMount() {
		// this.props.dispatch(actions.loadCourses());
	}

	render() {
		return (
			<form onSubmit={this.submit}>
				<h1>Home Page</h1>
				{this.props.courses.length > 0 &&
				<ul>
					{this.props.courses.map((course, i) =>
						<li key={i}
						    onClick={() => this.props.dispatch(actions.switchPage('coursedetail', {course}))}
						    style={{cursor: 'pointer'}}
						>{course.fullname}</li>
					)}
				</ul>
				}
			</form>
		);
	}
}

export default connect(state => Object.assign({}, state.pages.home, {
	courses: state.user.courses,
	dispatch: state.dispatch
}))(Home);
