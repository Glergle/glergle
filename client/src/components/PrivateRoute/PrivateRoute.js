import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const state = useContext(AuthContext)[0];
  return (
    <Route
      {...rest}
      render={({location}) => 
        state.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;