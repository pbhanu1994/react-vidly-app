import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./inputForm";
import Select from "./selectOption";

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

    // if (name === "username") {
    //   // return value.trim() === "" && "Username is required";
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   // return value.trim() === "" && "Password is required";
    //   if (value.trim() === "") return "Password is required";
    // }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate() {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    // const { data } = this.state;
    // if (data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = e => {
    //Prevents the Submission of the form (which causes the full page reload)
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
    //Getting the form values in React
    // const username = this.username.current.value;
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, list) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        list={list}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn-primary btn-lg">
        {label}
      </button>
    );
  }
}

export default Form;
