import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import * as userService from "../services/userService";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  //Creating Ref for form elements
  // username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //Call the Server
    try {
      const response = await userService.registerUser(this.state.data);
      const jwt = response.headers["x-auth-token"];
      auth.loginWithJwt(jwt);
      // this.props.history.push("/");
      //Need to make full reload of the application for the App component
      //- to be mounted again
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
