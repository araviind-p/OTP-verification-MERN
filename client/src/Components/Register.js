import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/otpVerify');

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      const data = {
        email,
        name,
        password,
      };

      axios.post("http://127.0.0.1:4000/api/v1/sendotp", data)
        .then((res) => {
          console.log(res);
          console.log(res);
          console.log("data sent");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className="main_container">
          <div className="container">
            <label htmlFor="name"><b>Name</b></label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              required
              onChange={e => setName(e.target.value)}
            />
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
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Register