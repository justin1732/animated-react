import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from './components/Navbar';
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Footer from "./components/Footer";
import './App.css';
import logo from "./fairy-tail.svg";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
     <img src={logo} className="App-logo" alt="logo" />
     <Navbar />
       <Switch>
       <Route exact path="/" component={Search} />
            <Route exact path="/saved" component={Saved} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
