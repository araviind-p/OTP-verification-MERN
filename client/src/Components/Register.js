import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlreadyRegistered from './AlreadyRegistered';
import Loading from './Loading';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
    } else {
      setEmailError("");
      const data = {
        name,
        email,
        password,
      };

      setLoading(true);
      axios.post("http://127.0.0.1:4000/api/v1/sendotp", data)
        .then((res) => {
          console.log("success message", res.data.success);
          console.log("response after otp send", res.data.otp);
          // data.otp = res.data.otp;
          console.log("data", data);
          setLoading(false);
          navigate('/otpVerify',{state:data});
          
          axios.post("http://127.0.0.1:4000/api/v1/signup", data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });

          console.log("data sent");
        })
        .catch((err) => {
          console.log(err.response.data);
          setLoading(false);

          if (err.response.data.message === "User is Already Registered") {
            setIsUserExist(true);
          }
        });
    }
  };

  return (
    <>
      {loading && <Loading />}

      {!loading && isUserExist && <AlreadyRegistered />}

      {!loading && !isUserExist && (
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
      )}
    </>
  );
}

export default Register;
