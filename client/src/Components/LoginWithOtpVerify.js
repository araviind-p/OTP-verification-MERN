import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginWithOtpVerify() {
    const [otp, setOtp] = useState("");

    const location = useLocation();
    const { email } = location.state;
    console.log("Received data in otp page from registerrr.... ", email);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,

        }
        // const data = { ...state, otp };
        // console.log("final data", data);
        axios.post("https://otp-verification-mern.onrender.com0/api/v1/loginwithotpverify", { otp, email })
            .then((res) => {
                console.log("ressss  ", res);
                console.log("tokennnnnnnn......", res.data.token);
                const token = res.data.User.token;  // Assuming the token is returned in the response data
                localStorage.setItem('token', token);  // Store token in local storage
                toast.success("Login successful!");

                setTimeout(() => {
                    navigate("/profile", { state: data });
                }, 1500);

            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error("incorrect otp")
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