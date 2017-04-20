import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';
import * as actions from '/actions';
import webservice from '/webservice';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Menu from '/components/Menu';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
//import TextField from 'material-ui/TextField';
import { reduxForm, Field } from 'redux-form'
import { load as loadAccount } from '/reducers'
import {
	Checkbox,
	RadioButtonGroup,
	SelectField,
	TextField,
	Toggle,
	DatePicker
} from 'redux-form-material-ui'

const { DOM: { input, select, textarea } } = React


class ItemDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		//this.props.dispatch(actions.loadPortfolioCategories());
		//const data = this.props.page.item;
		//console.log(data);
		//const { item }= getState();
		//console.log(item);
	}


			render() {
				const data = this.props.page.item;
					//const {handleSubmit, load, pristine, reset, submitting} = props
				const { handleSubmit, pristine, reset, submitting }= this.props;
					return (
						<form onSubmit={handleSubmit}>
							<div style={{marginLeft: "1%"}}>
								<Field
									hintText="Insert here"
									type="text"
									component={TextField}
									name="data.name"
									//onChange={() => this.props.dispatch()}
									floatingLabelText="Title"
								/>
								<p> {data.name} </p>
								<br />
								<Field
									hintText="Insert here"
									floatingLabelText="Content"
									multiLine={true}
									component={TextField}
									name="data.intro"
									type="text"
									//onChange={() => this.props.dispatch()}
									rows={2}
								/>
								<br />
								<TextField
									hintText="Insert here"
									floatingLabelText="Link"
									value={this.props.page.item.url}
								/>
								<br />
								<br />
								<div>
									<IconButton
										iconStyle={{width: 48, height: 48, color: "rgb(0, 188, 212)"}}
										style={{width: 48, height: 48, padding: 0, margin: 0}}
										onClick={() => {
											alert(1);
										}}
									><FileUpload /></IconButton>
								</div>
								<br />
								<br />
								<br />
								<br />
								<TextField
									hintText="Insert here"
									floatingLabelText="Comment"
									multiLine={true}
									rows={2}
								/><br />
								<button type="submit" disabled={pristine || submitting}>Submit</button>
								<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
							</div>
						</form>
					);
				}



}





 /*ItemDetails = connect(state => ({
	 page: pageSelector(state, 'itemdetails'),
	 initialValues: state // pull initial values from account reducer
 }),
{ load: loadAccount }
)(ItemDetails);*/

ItemDetails = reduxForm({
	form: 'ItemDetails'  // a unique identifier for this form
})(ItemDetails);

export default connect(state => ({
	page: pageSelector(state, 'itemdetails'),
}))(ItemDetails);


