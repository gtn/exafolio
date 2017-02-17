import React, { PropTypes, Component } from 'react';
import autobind from 'autobind-decorator'

export default class Login extends Component {
  @autobind
  submit (e) {
      e.preventDefault();
    this.props.onLogin({
      username: this.usernameInput.value,
      password: this.passwordInput.value
    });
  }

  render () {
    return (
      <form onSubmit={this.submit}>
          <h1>Login Form</h1>
          { this.props.loginError &&
              <div>Error: {this.props.loginError}</div>
          }
        <input placeholder="username" ref={(input) => { this.usernameInput = input; }} />
        <input placeholder="pass" ref={(input) => { this.passwordInput = input; }}/>
        <button onClick={this.submit}>LOGIN</button>
      </form>
    );
  }
}

/*
export default class Login extends Component {
  render () {
    return (
      <div>mein test {this.props.testprop ? 'ja' : 'nein'} asdf
        <input placeholder="username"/>
        <input placeholder="pass"/>
        <button onClick={this.props.onLogin}>LOGIN</button>
      </div>
    );
  }
}
*/
