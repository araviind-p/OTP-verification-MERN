import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("")
  const [place, setPlace] = useState("")
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
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
        age,
        place,
        password,
      };

      setLoading(true);
      axios.post("https://otp-verification-mern.onrender.com/api/v1/sendotp", data)
        .then((res) => {
          console.log("otp send");
          console.log("data", data);
          setLoading(false);
          navigate('/otpVerify', { state: data }); //navigate to EnterOtp component

          axios.post("https://otp-verification-mern.onrender.com/api/v1/signup", data)
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

          if (err.response.data.message === "User is Already Registered") {
            toast.error("User is Already Registered!")
          }
          setTimeout(() => {
            navigate("/");
            setLoading(false); // End loading after navigating
          }, 1500);
        });
    }
  };

  return (
    <>
      <ToastContainer className="custom-toast-container" />
      {loading ? <Loading />
        : (
          <form method="post" onSubmit={handleSubmit}>
            <div className="main_container register_main">
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
                  placeholder="Enter password"
                  name="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="age"><b>Age</b></label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  required
                  onChange={e => setAge(e.target.value)}
                />
                <label htmlFor="place"><b>Place</b></label>
                <input
                  type="text"
                  placeholder="Enter your place"
                  name="age"
                  required
                  onChange={e => setPlace(e.target.value)}
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
