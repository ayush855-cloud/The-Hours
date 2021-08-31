import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { postRegister } from '../../store/asyncMethods/AuthMethods';


function Register() {
  
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, registerErrors,user } = useSelector((state) => state.AuthReducer);
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  const userRegister = (e) => {
    e.preventDefault();
    dispatch(postRegister(state));
    setState({
      name:"",
      email:"",
      password:"",
    })

  }
  useEffect(() => {
    if (registerErrors?.length > 0) {
      registerErrors.map((error) =>
        toast.error(error.msg)
      );
    }
  }, [registerErrors,user]);

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="User Register" />
      </Helmet>
      <div className="row mt-80">
        <div className="col-8">
          <div className="bgImage">
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
              <form onSubmit={userRegister}>
                <div className="group">
                  <h3 className="form-heading">Register</h3>
                </div>
                <div className="group">
                  <input type="text" value={state.name} name="name" onChange={handleInputs} className="group__control" placeholder="Enter Name"></input>
                </div>
                <div className="group">
                  <input type="email" value={state.email} name="email" onChange={handleInputs} className="group__control" placeholder="Enter Email"></input>
                </div>
                <div className="group">
                  <input type="password" value={state.password} name="password" onChange={handleInputs} className="group__control" placeholder="Enter Password"></input>
                </div>
                <div className="group">
                  <input type="submit" value={loading ? "..." : "Register"} className="btn btn-default btn-block"></input>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register
