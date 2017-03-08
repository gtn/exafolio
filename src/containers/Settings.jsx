import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator'
import * as actions from '/actions';
import Modal from '../components/Modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import LinearProgress from 'material-ui/LinearProgress';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldValues: Object.assign({}, this.props.config),
			fieldErrors: {},
			loading: false,
		};
	}

	@autobind
	submit(e) {
		e.preventDefault();

		if (!this.checkFields()) {
			return;
		}

		this.props.dispatch(actions.setConfig({...this.state.fieldValues}));
		this.setState({loading: true});
		this.props.dispatch(actions.testConnection(this));
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

		this.setState({fieldValues, fieldErrors});

		// ok?
		return !Object.keys(fieldErrors).length;
	}

	render() {
		const {fieldValues, fieldErrors} = this.state;

		return (
			<form onSubmit={this.submit} className="exa-modal-frame">
				<Modal header="Settings">
					{ this.state.loading &&
					<div>Saving...
						<LinearProgress mode="indeterminate"/>
					</div>
					}
					<TextField
						floatingLabelText="Moodle Adresse"
						errorText={fieldErrors.moodleUrl}
						fullWidth={true}
						name="moodleUrl"
						value={fieldValues.moodleUrl}
						onChange={this.handleChange}
					/>

					<TextField
						floatingLabelText="Weitere Option die nichts macht"
						errorText={fieldErrors.anotherOption}
						fullWidth={true}
						name="anotherOption"
						defaultValue={fieldValues.anotherOption}
						onChange={this.handleChange}
					/>

					<RaisedButton
						label="Speichern"
						primary={true}
						type="submit"
						fullWidth={true}
						style={{marginTop: '20px'}}
						icon={<DoneIcon/>}
					/>

					<RaisedButton
						label="Zurück"
						onClick={() => {
							this.props.dispatch(actions.switchPage('login'));
						}}
						fullWidth={true}
						style={{marginTop: '20px'}}
						type="button"
						icon={<CancelIcon/>}
					/>
				</Modal>
			</form>
		);
	}
}

export default connect(state => ({
	config: state.config,
}))(Settings);
