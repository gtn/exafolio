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
import { reduxForm, Field} from 'redux-form'
import RichTextMarkdown from '/components/Rte';
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


class ItemDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

		render()
		{
			//const {handleSubmit, load, pristine, reset, submitting} = props
			const {handleSubmit, pristine, reset, submitting, load, change}= this.props;
			const {RichTextEditor, state: {value}, handleChange} = this
			return (
				<form onSubmit={handleSubmit(data => {
					//console.log(data);
					var newData = {};
					newData.id = data.item.id;
					newData.title = data.item.name;
					newData.url = data.item.url;
					newData.intro = data.item.intro;
					//newData.intro = newData.intro.createValueFromString(this.props.input.value, 'text');
					newData.filename = data.item.filename;
					newData.type = data.item.type;
					newData.file = data.file;
					//console.log(newData);

					this.props.dispatch(actions.loading(actions.changeDetails(newData))).then(this.props.dispatch(actions.switchPage('home')));
				})}>
					<div style={{marginLeft: "1%"}}>
						<Field
							hintText="Insert here"
							type="text"
							component={TextField}
							name="item.name"
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
							name="item.url"
							type="text"
						/>
						<br />
						<br />
						<div>
							<p> Files: </p>
							{this.props.page.item.isimage ? (
								<img src={this.props.page.item.file}/>
							) : (
								<a href={this.props.page.item.file}>{this.props.page.item.filename}</a>
							)}
						</div>
						<div>
							<Field
								name="file"
								type="file"
								component={customFileInput}/>


						</div>
						<br />
						<Field
							hintText="Insert here"
							floatingLabelText="Comment"
							multiLine={true}
							component={TextField}
							name="comment"
							type="text"
							//onChange={() => this.props.dispatch()}
							rows={2}
						/>
						<button type="submit" disabled={submitting}>Submit</button>
						<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
						<button onClick={() => {
							var newData = {};
							newData.id=this.props.page.item.id;
							this.props.dispatch(actions.loading(actions.deleteItem(newData))).then(this.props.dispatch(actions.switchPage('home')))}}>delete</button>
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
		initialValues: pageSelector(state, 'itemdetails')

}),
)(ItemDetails);


