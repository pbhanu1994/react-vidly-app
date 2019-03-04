import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  //Creating Ref for form elements
  // username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      //Call the Server
      await auth.loginUser(username, password);
      // this.props.history.push("/");

      //Getting the location object from the props
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      console.log("Submitted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
