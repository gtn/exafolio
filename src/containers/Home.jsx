import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '/actions';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {pageSelector} from '/selectors';
import Menu from '/components/Menu';
import ItemTypeFileIcon from 'material-ui/svg-icons/av/note';
import MenuItemIcon from 'material-ui/svg-icons/file/folder';
import sanitizeHtml from 'sanitize-html';

let SelectableList = makeSelectable(List);

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.dispatch(actions.loadPortfolioCategories());
	}

	printTree(children) {
		return children.map(item =>
			<ListItem
				key={item.id}
				value={item}
				primaryText={item.name}
				leftIcon={<MenuItemIcon />}
				primaryTogglesNestedList={false}
				nestedItems={this.printTree(item.children)}
			/>);
	}

	render() {
		let {selectedCategory} = this.state;
		if (!selectedCategory) {
			selectedCategory = this.props.portfolioCategoryTree[0];
		}
		let content = null;

		if (selectedCategory) {
			content = (
				<div>
					<h2>{selectedCategory.name}</h2>
					<List>
						{selectedCategory.items.length ?
							selectedCategory.items.map((item, i) =>
								<ListItem
									leftIcon={<ItemTypeFileIcon/>}
									key={item.id}
									style={{cursor: 'pointer'}}
									primaryText={<div>{item.name}
										<div>File: <a href={item.file} target="_blank">{item.filename}</a></div>
										{item.isimage &&
											<img style={{maxWidth: '200px', maxHeight: '200px'}} src={item.file}/>
										}
										<div dangerouslySetInnerHTML={{__html: sanitizeHtml(item.intro)}}></div>
									</div>
									}
								/>
							) :
							<ListItem
								key="empty"
								primaryText="Keine Einträge vorhanden"/>
						}
					</List>
				</div>
			)
		}

		return (
			<div>
				<Menu>
					<SelectableList
						value={selectedCategory}
						onChange={(event, value) => this.setState({selectedCategory: value})}
					>
						{this.props.portfolioCategoryTree && this.printTree(this.props.portfolioCategoryTree)}
					</SelectableList>
				</Menu>
				<Menu.PageContent>
					{content}
				</Menu.PageContent>
			</div>
		);
	}
}

export default connect(state => ({
	page: pageSelector(state, 'home'),
	courses: state.user.dakoracourses,
	portfolioCategoryTree: state.portfolioCategoryTree,
}))(Home);
