import React, { Component } from "react";
import Input from "./common/inputForm";

class Login extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {
      username: ""
    }
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

  validate() {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is Required";
    if (account.password.trim() === "")
      errors.password = "Password is Required";

    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = e => {
    //Prevents the Submission of the form (which causes the full page reload)
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

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
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />
          <button className="btn-primary btn-lg">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
