import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator'
import * as actions from '../actions';
import TextField from 'material-ui/TextField';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from '../components/Modal';

class Login extends Component {
	constructor(props) {
		super(props);

		// set the initial component state
		this.state = {
			loading: false,
			error: null
		}
	}

	@autobind
	submit(e) {
		e.preventDefault();

		this.setState({loading: true, error: ''});

		this.props.onSubmit({
			username: this.usernameInput.getValue(),
			password: this.passwordInput.getValue(),
			form: this
		});
	}

	render() {
		return (
			<form onSubmit={this.submit}>
				<Modal header="Login">
					{ this.state.loading &&
					<div>Loading...</div>
					}

					<TextField
						defaultValue="teacher"
						floatingLabelText="Username"
						ref={input => this.usernameInput = input}
						errorText={this.state.error}
						fullWidth={true}
					/>

					<TextField
						defaultValue="teacher"
						floatingLabelText="Password"
						ref={input => this.passwordInput = input}
						type="password"
						fullWidth={true}
					/>

					<RaisedButton
						label="Login"
						primary={true}
						icon={<ActionAndroid />}
						type="submit"
						fullWidth={true}
						style={{marginTop: '20px'}}
					/>

					<RaisedButton
						label="Settings"
						onClick={() => {
							this.props.dispatch(actions.switchPage('settings'));
						}}
						fullWidth={true}
						style={{marginTop: '20px'}}
					/>
				</Modal>
			</form>
		);
	}
}

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

export default connect(state => ({
	page: state.pages.login,
	dispatch: state.dispatch
}))(Login);
