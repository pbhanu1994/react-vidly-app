import React, { Component } from "react";
import Input from "./common/inputForm";

class Login extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {
      username: ""
    }
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      // return value.trim() === "" && "Username is required";
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      // return value.trim() === "" && "Password is required";
      if (value.trim() === "") return "Password is required";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
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
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = e => {
    //Prevents the Submission of the form (which causes the full page reload)
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call the Server
    console.log("Submitted");
    //Getting the form values in React
    // const username = this.username.current.value;
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn-primary btn-lg">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
