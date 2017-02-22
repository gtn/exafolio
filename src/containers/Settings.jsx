import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator'
import * as actions from '/actions';
import Modal from '../components/Modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldValues: Object.assign({}, this.props.config),
			fieldErrors: {}
		}

		console.log('constructor', this.state);
	}

	componentDidMount() {
		console.log('didmount', this.state);
	}

	@autobind
	submit(e) {
		e.preventDefault();

		if (this.checkFields()) {
			this.props.dispatch(actions.setConfig(this.state.fieldValues))
			this.props.dispatch(actions.switchPage('login'));
		}
	}

	@autobind
	handleChange(event) {
		let {fieldValues} = this.state;

		fieldValues[event.target.name] = event.target.value;
		this.setState({fieldValues});
	}

	checkFields() {
		let {fieldValues, fieldErrors} = this.state;

		fieldErrors = {};

		fieldValues.moodleUrl = fieldValues.moodleUrl ? fieldValues.moodleUrl.trim() : '';
		if (!fieldValues.moodleUrl.match(/(\/\/|^\/)/)) {
			fieldErrors.moodleUrl = 'Keine Adresse';
		}

		this.setState({fieldValues, fieldErrors});

		// ok?
		return !Object.keys(fieldErrors).length;
	}

	render() {
		const {fieldValues, fieldErrors} = this.state;

		return (
			<form onSubmit={this.submit} className="exa-modal-frame">
				<Modal header="Settings">
					<TextField
						floatingLabelText="Moodle Adresse"
						errorText={fieldErrors.moodleUrl}
						fullWidth={true}
						name="moodleUrl"
						defaultValue={fieldValues.moodleUrl || ''}
						onChange={this.handleChange}
					/>

					<TextField
						floatingLabelText="Weiter Option"
						errorText={fieldErrors.anotherOption}
						fullWidth={true}
						name="anotherOption"
						defaultValue={fieldValues.anotherOption || ''}
						onChange={this.handleChange}
					/>

					<RaisedButton
						label="Speichern"
						primary={true}
						type="submit"
						fullWidth={true}
						style={{marginTop: '20px'}}
					/>

					<RaisedButton
						label="Zurück"
						onClick={() => {
							this.props.dispatch(actions.switchPage('login'));
						}}
						fullWidth={true}
						style={{marginTop: '20px'}}
					  type="button"
					/>
				</Modal>
			</form>
		);
	}
}

export default connect(state => ({
	x: console.log(state),
	config: state.config,
}))(Settings);
