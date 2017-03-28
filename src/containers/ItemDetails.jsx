import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {pageSelector} from '/selectors';
import * as actions from '/actions';
import webservice from '/webservice';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Menu from '/components/Menu';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import TextField from 'material-ui/TextField';

class ItemDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		//const { item }= getState();
		//console.log(item);
	}

	render() {
		return (
				<div style={{marginLeft:"1%"}}>
					<TextField
						hintText="Insert here"
						//value= {this.props.page.item.id}
						floatingLabelText="Title"
					/>
					<br />
					<TextField
						hintText="Insert here"
						floatingLabelText="Content"
						multiLine={true}
						rows={2}
					/><br />
					<TextField
						hintText="Insert here"
						floatingLabelText="Link"
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
					<button onClick={() => this.props.dispatch(actions.switchPage('home'))}>back</button>
				</div>
		);
	}
}

export default connect(state => ({
	page: pageSelector(state, 'itemdetails')
}))(ItemDetails);
