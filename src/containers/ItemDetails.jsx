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


class ItemDetails extends Component {

	static propTypes = {
		input: PropTypes.shape({
			onChange: PropTypes.func.isRequired,
			value: PropTypes.string
		}).isRequired
	}

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		/*this.RichTextEditor = window.RichTextEditor
		this.setState({
			value: this.props.input.value ?
				this.RichTextEditor.createValueFromString(this.props.input.value, 'markdown') :
				this.RichTextEditor.createEmptyValue()
		})*/
	}

	handleChange = value => {
		this.setState({ value })
		let markdown = value.toString('markdown')
		if(markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
			markdown = ''
		}
		this.props.input.onChange(markdown)
	}


			render() {
					//const {handleSubmit, load, pristine, reset, submitting} = props
				const { handleSubmit, pristine, reset, submitting, load, change }= this.props;
				const {RichTextEditor, state: { value }, handleChange} = this
					return (
							<form onSubmit={handleSubmit(data => {
								console.log(data);
								this.props.dispatch(actions.changeDetails(data));
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
									//value={this.state.value}
									//onChange={this.onChange}
									//onChange={() => this.props.dispatch()}
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
		initialValues: pageSelector(state, 'itemdetails')

}),
)(ItemDetails);


