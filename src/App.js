import React, {Component} from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SinglePost from './components/SinglePost/SinglePost';
import CreatePost from './components/CreatePost/CreatePost';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <div className="container">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/Register' exact component={Register} />
            <Route path='/cereal/:id' exact component={SinglePost} />
            <Route path='/create' exact component={CreatePost} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
