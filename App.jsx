import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portfolio from './components/Portfolio'; 
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import AuthForm from './components/AuthForm';
import Homee from './components/Homee';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import UserForm from './components/UserForm';
import Admin from './components/Admin'
import AddProduct from './components/AddProduct';

export const App = () => {
  return (
    <Router>
      <Routes>''
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/Home"  element={<Home/>} />   
        <Route path="/Homee"  element={<Homee/>} />   
        <Route path="/Admin" element={<Admin/>} />
        {/* <PrivateRoute path="/homee" component={Homee} />  */}
        <Route path="/AddProduct" element={<AddProduct/>} />
        <Route path="/" element={<AuthForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/UserForm" element={<PrivateRoute><UserForm/></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;