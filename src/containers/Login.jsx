import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import * as actions from '/actions';
import TextField from 'material-ui/TextField';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from '/components/Modal';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';

// remember the state
let state = {
	fieldValues: {
		username: 'teacher',
		password: 'teacher',
	},
	loading: false,
	error: null
};

class Login extends Component {
	constructor(props) {
		super(props);

		// set the initial component state
		this.state = state;
	}

	@autobind
	submit(e) {
		e.preventDefault();

		const {fieldValues} = this.state;

		if (!fieldValues.username) {
			this.setState({loading: false, error: 'No username'});
			this.props.dispatch(actions.loginError('No username'));
		} else {
			this.setState({loading: true, error: ''});
			this.props.dispatch(actions.login(this, fieldValues));
		}
	}

	@autobind
	handleChange(event) {
		const {fieldValues} = this.state;

		fieldValues[event.target.name] = event.target.value;
		this.setState({fieldValues});
	}

	componentWillUnmount() {
		// Remember state for the next mount
		state = this.state;
	}

	render() {
		const {fieldValues} = this.state;

		return (
			<form onSubmit={this.submit}>
				<Modal header="Login">
					{ this.state.loading &&
					<div>Loading...</div>
					}

					<TextField
						floatingLabelText="Username"
						ref={input => this.usernameInput = input}
						errorText={this.state.error}
						fullWidth={true}
						name="username"
						defaultValue={fieldValues.username}
						onChange={this.handleChange}
					/>

					<TextField
						floatingLabelText="Password"
						ref={input => this.passwordInput = input}
						type="password"
						fullWidth={true}
						name="password"
						defaultValue={fieldValues.password}
						onChange={this.handleChange}
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

/*
Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
*/

export default connect(state => ({
	page: pageSelector(state, 'login')
}))(Login);
