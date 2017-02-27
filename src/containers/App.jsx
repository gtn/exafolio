import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import Settings from './Settings';
import Home from './Home';
import CourseDetail from './CourseDetail';
import * as actions from '/actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import '/css/styles.css';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';


// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
if (!window.TapEventInjected) {
	injectTapEventPlugin();
	window.TapEventInjected = true;
}

class App extends Component {
	render() {
		let page;

		if (this.props.currentPage == 'settings') {
			return <Settings/>;
		} else if (this.props.currentPage == 'login') {
			return <Login/>;
		} else if (this.props.currentPage == 'coursedetail') {
			page = <CourseDetail/>;
		} else if (this.props.currentPage == 'home') {
			page = <Home/>;
		}

		return (
			<div>
				<AppBar
					title={`Exafolio (${this.props.user.fullname})`}
					showMenuIconButton={false}
					style={{position: 'fixed', left: 0, top: 0}}
					iconElementRight={
						<div>
							<IconButton
								iconStyle={{width: 48, height: 48, color: 'white'}}
								style={{width: 48, height: 48, padding: 0, margin: 0}}
								onClick={() => {
									this.props.dispatch(actions.logout());
								}}
							><ExitIcon /></IconButton>
						</div>
					}
				/>
				{page}
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default connect((state) => state)(App);
