import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from '/actions';
import Picker from '/components/Picker';
import Posts from '/components/Posts';
import Login from './Login';
import Settings from './Settings';
import Home from './Home';
import CourseDetail from './CourseDetail';
import autobind from 'autobind-decorator'
import * as actions from '/actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import '/css/styles.css';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';


// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
if (!window.TapEventInjected) {
	injectTapEventPlugin();
	window.TapEventInjected = true;
}

class App extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);

		// this.state = {};
	}

	/*
	componentDidMount() {
		console.log(this.props);
		const {dispatch, selectedReddit} = this.props;

		dispatch(actions.loadCourses());
	}
	*/

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedReddit !== this.props.selectedReddit) {
			const {dispatch, selectedReddit} = nextProps;
			dispatch(fetchPostsIfNeeded(selectedReddit));
		}
	}

	handleChange(nextReddit) {
		this.props.dispatch(selectReddit(nextReddit));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		// const {dispatch, selectedReddit} = this.props;
		// dispatch(invalidateReddit(selectedReddit));
		// dispatch(fetchPostsIfNeeded(selectedReddit));
	}

	render() {
		if (!this.props.isLoggedin) {
			if (this.props.currentPage == 'settings') {
				return <Settings/>;
			} else {
				return <Login onSubmit={this.handleLogin}/>;
			}
		} else {
			let page;
			if (this.props.currentPage == 'coursedetail') {
				page = <CourseDetail/>;
			} else {
				page = <Home/>;
			}

			return (
				<div>
					<AppBar
						title={`Exafolio (${this.props.user.fullname})`}
						showMenuIconButton={false}
						style={{position: 'fixed', left: 0, top: 0}}
						iconElementRight={
							<div>
								<IconButton
									iconStyle={{width: 48, height: 48, color: 'white'}}
									style={{width: 48, height: 48, padding: 0, margin: 0}}
									onClick={() => {
										this.props.dispatch(actions.logout());
									}}
								><ExitIcon /></IconButton>
							</div>
						}
					/>
					{page}
				</div>
			);
		}

		const {selectedReddit, posts, isFetching, lastUpdated} = this.props;

		let content = !this.props.loggedin ?
			( <div>
				<Login onSubmit={this.handleLogin} loginError={this.state.loginError}/>
			</div>) :
			( <div>
					<Picker value={selectedReddit}
					        onChange={this.handleChange}
					        options={['reactjs', 'elixir', 'emberjs']}/>
					<p>
						{lastUpdated &&
						<span>
              Latest updated at {new Date(lastUpdated).toLocaleTimeString()}.
							{' '}
            </span>
						}
						{!isFetching &&
						<a href='#'
						   onClick={this.handleRefreshClick}>
							Refresh
						</a>
						}
					</p>
					{isFetching && posts.length === 0 &&
					<h2>Loading...</h2>
					}
					{!isFetching && posts.length === 0 &&
					<h2>Empty.</h2>
					}
					{posts.length > 0 &&
					<div style={{opacity: isFetching ? 0.5 : 1}}>
						<Posts posts={posts}/>
					</div>
					}
				</div>
			);
		return (
		{content}
		);
	}
}

App.propTypes = {
	/*
		selectedReddit: PropTypes.string.isRequired,
		posts: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
	*/
	dispatch: PropTypes.func.isRequired
};

/*
function mapStateToProps(state) {
	console.log('state', state.pages.login);
	const {selectedReddit, postsByReddit} = state;
	const {
		isFetching,
		lastUpdated,
		items: posts
	} = postsByReddit[selectedReddit] || {
		isFetching: true,
		items: [],
	};

	console.log('map');
	let loggedin = !!state.loggedin;

	return {
		loggedin,
		selectedReddit,
		posts,
		isFetching,
		lastUpdated
	};
}
*/
// export default connect(mapStateToProps)(App);

export default connect((state) => state)(App);
