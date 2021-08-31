import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { postLogin } from '../../store/asyncMethods/AuthMethods';

function Login() {
  const dispatch = useDispatch();
  const { loading, loginErrors } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    email: "",
    password: "",
  })
  const handleInputs = (e) => {
    setState({
      ...state, [e.target.name]: e.target.value,
    });
  };
  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
    setState({
      email:"",
      password:"",
    })

  }
  useEffect(() => {
    if (loginErrors?.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors])
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="User Login" />

      </Helmet>
      <div className="row mt-80">
        <div className="col-8">
          <div className="backgroundImage">
            <Toaster position="top-center" reverseOrder={false} toastOptions={{

              style: {
                fontSize: "14px",
              },
            }} />
          </div>
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <form onSubmit={userLogin}>
                <div className="group">
                  <h3 className="form-heading">Login</h3>
                </div>
                <div className="group">
                  <input type="email" name="email" value={state.email} onChange={handleInputs} className="group__control" placeholder="Enter Email"></input>
                </div>
                <div className="group">
                  <input type="password" name="password" value={state.password} onChange={handleInputs} className="group__control" placeholder="Enter Password"></input>
                </div>
                <div className="group">
                  <input type="submit" className="btn btn-default btn-block" value={loading ? "..." : "Login"}></input>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
