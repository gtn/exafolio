import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import {connect} from 'react-redux';
import * as actions from '../actions';
import webservice from '../webservice';

class CourseDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.props.dispatch(() => webservice.wsfunction('dakora_get_students_for_course', {
			courseid: this.props.course.courseid
		})
			.then((students) => this.setState({students})));
	}

	render() {
		return (
			<div>
				<h1>Course {this.props.page.course.fullname}</h1>
				{!this.state.students
					? 'lade studenten liste'
					: this.state.students.map((student, i) =>
					<li key={i}
					    onClick={() => this.props.dispatch(actions.switchPage('studentdetail', {student}))}
					    style={{cursor: 'pointer'}}
					>{student.firstname} {student.lastname}</li>
				)}
				<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
			</div>
		);
	}
}

export default connect(state => Object.assign({}, {
	page: state.pages.coursedetail,
	course: state.pages.coursedetail.course,
	dispatch: state.dispatch,
}))(CourseDetail);
