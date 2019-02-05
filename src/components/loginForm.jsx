import React, { Component } from "react";

class Login extends Component {
  state = {
    account: { username: "", password: "" }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  //Creating Ref for form elements
  username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSubmit = e => {
    //Prevent the Submission of the form (which causes the full page reload)
    e.preventDefault();

    //Call the Server
    console.log("Submitted");
    //Getting the form values in React
    // const username = this.username.current.value;
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={account.username}
              onChange={this.handleChange}
              autoFocus
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={account.password}
              onChange={this.handleChange}
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn-primary btn-lg">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
