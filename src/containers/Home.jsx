import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import {connect} from 'react-redux';
import * as actions from '../actions';
import {List, ListItem} from 'material-ui/List';
import Translate from '../components/Translate';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(actions.loadCourses());
	}

	render() {
		return (
			<form onSubmit={this.submit}>
				<div className="container-fluid">
					<div className="row">
						<div className="exa-col col-sm-2">
							<List>
								<ListItem primaryText="Menu"/>
								<ListItem primaryText="Menu"/>
								<ListItem primaryText="Menu"/>
								<ListItem primaryText="Menu"/>
							</List>
						</div>
						<div className="exa-col col-sm-10">
							{this.props.courses.length > 0 &&
							<List>
								{this.props.courses.map((course, i) =>
									<ListItem
										key={i}
										onClick={() => this.props.dispatch(actions.switchPage('coursedetail', {course}))}
										style={{cursor: 'pointer'}}
										primaryText={course.fullname}/>
								)}
							</List>
							}
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default connect(state => ({
	page: state.pages.home,
	courses: state.user.courses,
	dispatch: state.dispatch
}))(Home);
