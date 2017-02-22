import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '/store';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<App />
				</MuiThemeProvider>
			</Provider>
		);
	}
}
