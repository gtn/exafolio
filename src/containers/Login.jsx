import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator'
import * as actions from '/actions';
import * as lib from '/lib';
import TextField from 'material-ui/TextField';
import LoginIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from '/components/Modal';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';
import LinearProgress from 'material-ui/LinearProgress';

// remember the state
let state = {
	fieldValues: {},
	loading: false,
	error: null
};

class Login extends Component {
	constructor(props) {
		super(props);

		// set the initial component state
		this.state = state;
		// this.state.fieldValues.username =
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

	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}

	componentWillReceiveProps(nextProps) {
		const {fieldValues} = this.state;
		if (!fieldValues.username && nextProps.config.lastUsername) {
			this.setState({fieldValues: {... fieldValues, username: nextProps.config.lastUsername}});
		}
	}

	render() {
		const {fieldValues} = this.state;

		return (
			<form onSubmit={this.submit}>
				<Modal header="Login">
					{this.state.loading &&
					<div>Loading...
						<LinearProgress mode="indeterminate"/>
					</div>
					}

					{this.props.config.moodleUrl &&
					<TextField
						floatingLabelText="Server"
						fullWidth={true}
						value={(this.props.config.moodleName ? (this.props.config.moodleName + '\n') : '')
						+ this.props.config.moodleUrl}
						multiLine={true}
						disabled={true}
					/>
					}

					<TextField
						floatingLabelText="Benutzer"
						errorText={this.state.error || this.props.page.error}
						fullWidth={true}
						name="username"
						value={fieldValues.username || ''}
						onChange={this.handleChange}
					/>

					<TextField
						floatingLabelText="Passwort"
						type="password"
						fullWidth={true}
						name="password"
						value={fieldValues.password || ''}
						onChange={this.handleChange}
					/>

					<RaisedButton
						label="Login"
						primary={true}
						icon={<LoginIcon />}
						type="submit"
						fullWidth={true}
						style={{marginTop: '20px'}}
					/>

					<RaisedButton
						label="Settings"
						onClick={() => {
							this.props.dispatch(actions.switchPage('settings'));
						}}
						icon={<SettingsIcon />}
						fullWidth={true}
						style={{marginTop: '20px'}}
					/>

				<div style={{textAlign: 'center', color: 'grey', margin: '20px 0 -20px 0'}}>
					Exafolio v{lib.getVersion()}
				</div>
				</Modal>
			</form>
		);
	}
}

export default connect(state => ({
	page: pageSelector(state, 'login'),
	config: state.config
}))(Login);
