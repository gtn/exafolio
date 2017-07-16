import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '/actions';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import {pageSelector} from '/selectors';
import Menu from '/components/Menu';
import ItemTypeFileIcon from 'material-ui/svg-icons/av/note';
import MenuItemIcon from 'material-ui/svg-icons/file/folder';
import sanitizeHtml from 'sanitize-html';
import {getPortfolioCategoryTree} from '/lib';

let SelectableList = makeSelectable(List);

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.dispatch(actions.loading(actions.loadPortfolioCategories()));
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
		let {selectedCategoryId, portfolioCategoriesById} = this.props;

		let hasCategories = !!Object.keys(portfolioCategoriesById).length;

		let portfolioCategoryTree = getPortfolioCategoryTree(portfolioCategoriesById);

		let selectedCategory = hasCategories && portfolioCategoriesById[selectedCategoryId];
		let content = null;

		if (selectedCategory) {
			content = (
				<div>
					<div>
					<h2 style={{display:"inline-block"}}>{selectedCategory.name}</h2>

						<IconButton
							iconStyle={{width: 48, height: 48, color: "rgb(0, 188, 212)"}}
							style={{width: 48, height: 48, padding: 0, marginTop:"5px", float: "right"}}
							onClick={() => {
								this.props.dispatch(actions.switchPage('additem', {selectedCategoryId: selectedCategory.id}));
							}}
						><Add /></IconButton>
					</div>
					<List>
						{selectedCategory.items.length ?
							selectedCategory.items.map((item, i) =>
								<ListItem
									leftIcon={<ItemTypeFileIcon/>}
									key={item.id}
									style={{cursor: 'pointer'}}
									onClick={() => {
										this.props.dispatch(actions.switchPage('itemdetails', {item: item}));
									}}

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
						onChange={(event, value) => this.props.dispatch(actions.selectCategory(value.id))}
					>
						{portfolioCategoryTree && this.printTree(portfolioCategoryTree)}
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
	selectedCategoryId: state.selectedCategoryId,
	portfolioCategoriesById: state.portfolioCategoriesById,
}))(Home);
