import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';
import * as actions from '/actions';
import webservice from '/webservice';
import {List, ListItem} from 'material-ui/List';

class CourseDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.props.dispatch(() => webservice.wsfunction('dakora_get_students_for_course', {
			courseid: this.props.page.course.courseid
		})
			.then((students) => this.setState({students})));
	}

	render() {
		return (
			<div>
				<h1>Course {this.props.page.course.fullname}</h1>
				{!this.state.students
					? 'lade studenten liste'
					: (
					<List>
						{this.state.students.map((student, i) =>
							<ListItem
								key={i}
								style={{cursor: 'pointer'}}
								onClick={() => alert(`sudent click ${student.firstname} ${student.lastname}`)}
								primaryText={student.firstname + ' ' + student.lastname}/>
						)
						}
					</List>
				)
					//onClick={() => this.props.dispatch(actions.switchPage('studentdetail', {student}))}
				}

				<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
			</div>
		);
	}
}

export default connect(state => ({
	page: pageSelector(state, 'coursedetail')
}))(CourseDetail);
