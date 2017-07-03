import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';
import * as actions from '/actions';
import webservice from '/webservice';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Menu from '/components/Menu';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import RichTextMarkdown from '/components/Rte';
//import TextField from 'material-ui/TextField';
import { reduxForm, Field} from 'redux-form'
import {
	Checkbox,
	RadioButtonGroup,
	SelectField,
	TextField,
	Toggle,
	DatePicker
} from 'redux-form-material-ui'

const { DOM: { input, select, textarea } } = React

const customFileInput = (field) => {
	delete field.input.value; // <-- just delete the value property
	return <input type="file" id="file" {...field.input} />;
};


class AddItem extends Component {
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
		//const {handleSubmit, load, pristine, reset, submitting} = props
		const { handleSubmit, pristine, reset, submitting, load, change, values,}= this.props;
		return (
			<form onSubmit={handleSubmit(data => {
				var newData = {};
				console.log(data);
				newData.title = data.name;
				newData.url = data.url;
				newData.intro = data.intro;
				newData.file = data.file;
				newData.filename = "";
				newData.type = "file";
				console.log(this.props.selectedCategoryId);
				newData.categoryid = this.props.selectedCategoryId;
				newData.fileitemid = 0;

				//console.log(newData);

				this.props.dispatch(actions.addItem(newData)).then(this.props.dispatch(actions.switchPage('home')));
			})}>
				<div style={{marginLeft: "1%"}}>
					<Field
						hintText="Insert here"
						type="text"
						component={TextField}
						name="name"
						//onChange={() => this.props.dispatch()}
						floatingLabelText="Title"
					/>
					<br />
					<Field
						hintText="Insert here"
						floatingLabelText="Content"
						multiLine={true}
						component={RichTextMarkdown}
						name="item.intro"
						type="text"
						rows={2}
					/>
					<br />
					<Field
						hintText="Insert here"
						floatingLabelText="Link"
						component={TextField}
						name="url"
						type="text"
					/>
					<br />
					<br />
					<div>
						<Field
							name="file"
							type="file"
							component={customFileInput}/>


					</div>
					<br />
					<br />
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

AddItem = reduxForm({
	form: 'AddItem'  // a unique identifier for this form
})(AddItem);

export default connect(state => ({
		page: pageSelector(state, 'additem'),
		initialValues: pageSelector(state, 'additem'),
		selectedCategoryId: state.selectedCategoryId,
	}),
)(AddItem);
