import React, {PropTypes, Component} from 'react';
// import {TransitionMotion, Motion, spring, presets} from 'react-motion';
import Collapse, {Panel} from 'rc-collapse';
import 'rc-collapse/assets/index.css';

export default class Menu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todos: [
				// key is creation date
				{key: 't1', data: {text: 'Board the plane', isDone: false}},
				{key: 't2', data: {text: 'Sleep', isDone: false}},
				{key: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
				{key: 't4', data: {text: 'Eat cheese and drink wine', isDone: false}},
				{key: 't5', data: {text: 'Go around in Uber', isDone: false}},
				{key: 't6', data: {text: 'Talk with conf attendees', isDone: false}},
				{key: 't7', data: {text: 'Show Demo 1', isDone: false}},
				{key: 't8', data: {text: 'Show Demo 2', isDone: false}},
				{key: 't9', data: {text: 'Lament about the state of animation', isDone: false}},
				{key: 't10', data: {text: 'Show Secret Demo', isDone: false}},
				{key: 't11', data: {text: 'Go home', isDone: false}},
			],
			value: '',
			selected: 'all',
		};
	}

	handleDestroy = (search) => {
		// console.log(this.state.todos);
		// console.log(this.state.todos.filter(({key}) => key !== search));
		// remove this element from array
		this.setState({todos: this.state.todos.filter(({key}) => key !== search)});
	}

	// actual animation-related logic
	getDefaultStyles() {
		return this.state.todos.map(todo => ({...todo, style: {height: 0}}));
	}

	getStyles() {
		const {todos} = this.state;
		return todos
			.map((todo, i) => {
				return {
					...todo,
					style: {
						height: spring(100),
					}
				};
			});
	}

	willEnter() {
		return {
			height: 0,
		};
	}

	willLeave() {
		return {
			height: spring(0),
		};
	}

	render() {
		return (
			<Collapse accordion={false}>
				<Panel header="hello">this is panel content</Panel>
				<Panel header="title2">this is panel content2 or other</Panel>
			</Collapse>
		);
		return (
			<TransitionMotion
				defaultStyles={this.getDefaultStyles()}
				styles={this.getStyles()}
				willLeave={this.willLeave}
				willEnter={this.willEnter}>
				{items =>
					<ul>
						{items.map(({key, style, data: item}) =>
							<li key={key} style={Object.assign({overflow: 'hidden', margin: '5px', background: 'blue'}, style)}>
								{item.text} {JSON.stringify(style)} {JSON.stringify(item)}
								<button
									type="button"
									onClick={this.handleDestroy.bind(null, key)}
								>destroy
								</button>
							</li>
						)}
					</ul>
				}
			</TransitionMotion>
		);
	}
}

