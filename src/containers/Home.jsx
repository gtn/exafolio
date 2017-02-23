import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '/actions';
import {List, ListItem} from 'material-ui/List';
import {pageSelector} from '/selectors';
import Menu from '/components/Menu';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(actions.loadCourses());
	}

	render() {
		return (
			<div>
				<Menu>
					<List>
						<ListItem
							primaryText="Menu"
							leftIcon={<ContentInbox />}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									key={1}
									primaryText="Starred"
									leftIcon={<ContentInbox />}
								/>,
								<ListItem
									key={2}
									primaryText="Sent Mail"
									leftIcon={<ContentInbox />}
									primaryTogglesNestedList={true}
									nestedItems={[
										<ListItem key={1} primaryText="Drafts" leftIcon={<ContentInbox />}/>,
									]}
								/>
							]}
						/>
						<ListItem
							primaryText="Menu"
							leftIcon={<ContentInbox />}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									key={1}
									primaryText="Starred"
									leftIcon={<ContentInbox />}
								/>,
								<ListItem
									key={2}
									primaryText="Sent Mail"
									leftIcon={<ContentInbox />}
									primaryTogglesNestedList={true}
									nestedItems={[
										<ListItem key={1} primaryText="Drafts" leftIcon={<ContentInbox />}/>,
									]}
								/>
							]}
						/>
						<ListItem
							primaryText="Menu"
							leftIcon={<ContentInbox />}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									key={1}
									primaryText="Starred"
									leftIcon={<ContentInbox />}
								/>,
								<ListItem
									key={2}
									primaryText="Sent Mail"
									leftIcon={<ContentInbox />}
									primaryTogglesNestedList={true}
									nestedItems={[
										<ListItem key={1} primaryText="Drafts" leftIcon={<ContentInbox />}/>,
									]}
								/>
							]}
						/>
					</List>
				</Menu>
				<Menu.PageContent>
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
				</Menu.PageContent>
			</div>
		);
	}
}

export default connect(state => ({
	page: pageSelector(state, 'home'),
	courses: state.user.dakoracourses,
}))(Home);
