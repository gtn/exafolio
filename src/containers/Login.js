import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator'
import * as actions from '../actions';

class Login extends Component {
	@autobind
	submit(e) {
		e.preventDefault();
		this.props.onSubmit({
			username: this.usernameInput.value,
			password: this.passwordInput.value
		});
	}

	render() {
		return (
			<form onSubmit={this.submit}>
				<h1>Login Form</h1>
				{ this.props.error &&
				<div>Error: {this.props.error}</div>
				}
				<input placeholder="username" defaultValue="teacher" ref={(input) => {
					this.usernameInput = input;
				}}/>
				<input type="password" placeholder="pass" defaultValue="teacher" ref={(input) => {
					this.passwordInput = input;
				}}/>
				<button type="submit">Login</button>
				<button type="button" onClick={() => { this.props.dispatch(actions.switchPage('settings')); }}>Settings</button>
			</form>
		);
	}
}

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

export default connect(state => Object.assign({}, state.pages.login, {dispatch: state.dispatch}))(Login);
