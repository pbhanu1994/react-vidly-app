import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NewMovieForm from "./components/NewMovieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Login from "./components/loginForm";
import Register from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* <Route path="/movies/:id" component={MovieForm} /> */}

          {/* Rendering the component if user exists in the state */}
          <ProtectedRoute path="/movies/:id" component={NewMovieForm} />

          {/* Passing props below to the Movies Component in Route */}
          <Route
            path="/movies"
            render={props => <Movies {...props} user={user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
