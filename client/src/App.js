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
          <nav className="bg-gray-800 text-secondary flex justify-end">
            <Link className="py-4 px-3 hover:bg-primary hover:text-gray-800" to="/home">Home</Link>
            <Link className="py-4 px-3 hover:bg-primary hover:text-gray-800" to="/profile">Profile</Link>
            <Link className="py-4 px-3 hover:bg-primary hover:text-gray-800" to="/login">Login</Link>
          </nav>
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