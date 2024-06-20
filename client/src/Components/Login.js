import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      const data = {
        email,
        password,
      };

      axios.post("https://otp-verification-mern.onrender.com/api/v1/login", data)
        .then((res) => {
          const token = res.data.token;  // Assuming the token is returned in the response data
          localStorage.setItem('token', token);  // Store token in local storage
          localStorage.setItem("email", data.email) //store email in local storage
          navigate("/profile") //navigate to profile page after successful login
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === "Password incorrects") {
            toast.error("Incorrect password. Please try again.");
          }
          else if (err.response.data.message === "You have to Signup First") {
            toast.error("You have to Signup First");
          }

        });
    }
  }
  return (
    <>
      <ToastContainer className="custom-toast-container" />
      <form method="post" onSubmit={handleSubmit}>
        <div className="main_container">
          <div className="container">
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
              onChange={e => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
      <button className="register"><Link to={'/register'}>Dont have an account? Signup</Link> </button>
      <button className="login_with_otp"><Link to={'/loginwithotp'}>Login with otp</Link> </button>
    </>
  )
}

export default Login