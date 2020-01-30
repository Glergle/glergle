import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {

  return(
    <AuthProvider>
      <Router>
        <div className="app-container">
          <h1 className="text-secondary mx-auto text-center text-4xl">Hello World!</h1>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/profile">
              <Profile></Profile>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;