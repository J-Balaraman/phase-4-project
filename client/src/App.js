import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Users from './components/Users';
import Books from './components/Books';
import Ratings from './components/Ratings';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />  // Add the Home route
          <Route path="/users" component={Users} />
          <Route path="/books" component={Books} />
          <Route path="/ratings" component={Ratings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
