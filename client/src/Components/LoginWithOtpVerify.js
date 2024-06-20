import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginWithOtpVerify() {

    const [otp, setOtp] = useState("");

    const email = localStorage.getItem('email') // Retrieve email from local storage

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://otp-verification-mern.onrender.com/api/v1/loginwithotpverify", { otp, email })
            .then((res) => {
                const token = res.data.User.token;  // Assuming the token is returned in the response data
                localStorage.setItem('token', token);  // Store token in local storage
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate("/profile"); // Redirect to profile page after otp verification success
                }, 1500);

            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error("incorrect otp")
                localStorage.removeItem('email') // Removing email from local storage
                navigate("/")
            });
    }

    return (
        <>
            <ToastContainer className="custom-toast-container" />
            <form method="post" onSubmit={handleSubmit}>
                <div className="main_container otp_verify_main">
                    <div className="container">
                        <label ><b>Enter OTP recieved in your mail</b></label>
                        <input
                            type="text"
                            placeholder="Enter otp"
                            name="otp"
                            required
                            onChange={e => setOtp(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginWithOtpVerify