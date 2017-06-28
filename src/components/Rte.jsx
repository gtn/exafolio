
import React, { Component, PropTypes } from 'react'
var RichTextEditor;
if (typeof(window) !== 'undefined') { RichTextEditor = require('react-rte').default; }

class RichTextMarkdown extends Component {
	static propTypes = {
		input: PropTypes.shape({
			onChange: PropTypes.func.isRequired,
			value: PropTypes.string
		}).isRequired
	}

	constructor(props) {
		super(props)
		this.state = { value: undefined }
	}

	componentDidMount() {
		this.RichTextEditor = RichTextEditor;
		this.setState({
			value: this.props.input.value ?
				this.RichTextEditor.createValueFromString(this.props.input.value, 'html') :
				this.RichTextEditor.createEmptyValue()
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.submitSucceeded) {
			this.setState({
				value: this.props.input.value ?
					this.RichTextEditor.createValueFromString(this.props.input.value, 'html') :
					this.RichTextEditor.createEmptyValue()
			})
		}
	}

	handleChange = value => {
		this.setState({ value })
		let markdown = value.toString('html')
		if(markdown.length === 2 && markdown.charCodeAt(0) === 8203 && markdown.charCodeAt(1) === 10) {
			markdown = ''
		}
		this.props.input.onChange(markdown)
	}

	render() {
		const { RichTextEditor, state: { value }, handleChange } = this
		return RichTextEditor ? <RichTextEditor value={value} onChange={handleChange}/> : <div/>
	}
}

export default RichTextMarkdown
