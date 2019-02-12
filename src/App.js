import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NewMovieForm from "./components/NewMovieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Login from "./components/loginForm";
import Register from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar />
        <Switch>
          {/* <Route path="/movies/:id" component={MovieForm} /> */}
          <Route path="/movies/:id" component={NewMovieForm} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
