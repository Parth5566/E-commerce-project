import React from 'react';
import { useNavigate } from "react-router-dom";

// PrivateRoute component to protect routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem('authToken'); // Check if the user is authenticated
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...props} /> // If authenticated, render the requested component
        ) : (
          navigate("/") // If not authenticated, redirect to the login page
        )
      }
    />
  );
};

export default PrivateRoute;
