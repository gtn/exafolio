import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, actions, fetchPostsIfNeeded, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import Login from '../components/Login';
import autobind from 'autobind-decorator'

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);

    this.state = {};
  }


  componentDidMount() {
    const { dispatch, selectedReddit } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  @autobind
  handleLogin(data) {
    if (!data.username) {
      this.setState({
        loginError: 'kein username'
      });
      return;
    }

    this.props.dispatch(actions.loggedin());
    this.props.dispatch(fetchPostsIfNeeded(this.props.selectedReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedReddit } = this.props;
    dispatch(invalidateReddit(selectedReddit));
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render () {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;

    return !this.props.loggedin ?
        ( <div>
          <Login onLogin={this.handleLogin} loginError={this.state.loginError} />
        </div>) :
      (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={['reactjs', 'elixir', 'emberjs']} />
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
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;
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

export default connect(mapStateToProps)(AsyncApp);
