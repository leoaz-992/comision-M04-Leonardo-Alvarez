//import { useState, useEffect } from 'react';
//import { Card } from 'react-bootstrap';
//import axios from 'axios';

import LoginForm from "../components/LoginForm";


const Login = () => {
 
  return (
    <>
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        <LoginForm/>
      </div>
    </div>
    </>
  )
}

export default Login;