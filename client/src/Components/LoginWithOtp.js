import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

function LoginWithOtp() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      toast.error("Invalid mail")
    } else {
      setEmailError("");
      const data = {
        email,
      };
      setLoading(true)
      axios.post("https://otp-verification-mern.onrender.com/api/v1/loginwithotp", data)
        .then((res) => {
          localStorage.setItem('email', email) // Store email in local storage
          navigate('/verifyotp'); // Redirect to LoginWithOtpVerify component
          console.log("otp send");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setLoading(false);
          const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
          toast.error(errorMessage)
        });
    }
  }

  return (
    <>
      <ToastContainer className="custom-toast-container" />
      {loading ? <Loading /> :
        (
          <>
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

                  <button type="submit">Get OTP</button>
                </div>
              </div>
            </form>
          </>
        )}
    </>
  )
}

export default LoginWithOtp