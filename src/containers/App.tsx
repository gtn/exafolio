import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import Settings from './Settings';
import Home from './Home';
import CourseDetail from './CourseDetail';
import * as actions from 'actions';
import * as lib from 'lib';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import '/css/styles.css';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import AddItem from './AddItem';
import ItemDetails from './ItemDetails';
import LoadingOverlay from 'components/LoadingOverlay';

declare global {
    interface Window { TapEventInjected: boolean; }
}

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
if (!window.TapEventInjected) {
	injectTapEventPlugin();
	window.TapEventInjected = true;
}

interface Props extends lib.DefaultProps {
	currentPage: string,
	user: {
		fullname: string
	},
	isLoading: boolean
}

class App extends Component<Props, any> {
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
		} else if (this.props.currentPage == 'itemdetails') {
			page = <ItemDetails/>;
		} else if (this.props.currentPage == 'additem') {
			page = <AddItem/>;
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
				<div style={{marginTop: "64px"}}>
					{page}
				</div>
				<LoadingOverlay loading={this.props.isLoading}/>
			</div>
		);
	}
}

export default connect((state) => state)(App);
