import React, { PropTypes, Component } from 'react';
import autobind from 'autobind-decorator'
import * as actions from '../actions';

export default class Settings extends Component {
  render () {
    return (
      <form onSubmit={this.submit}>
          <h1>Settings Page</h1>
  				<button type="button" onClick={() => { this.props.dispatch(actions.switchPage('login')); }}>Back</button>
      </form>
    );
  }
}
