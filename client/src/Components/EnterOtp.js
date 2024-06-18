import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EnterOtp() {
    const [otp, setOtp] = useState("");

    const location = useLocation();
    const { state } = location;
    console.log("Received data in otp page from register.... ", state);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...state, otp };
        console.log("final data", data);
        axios.post("https://otp-verification-mern.onrender.com/api/v1/signup", data)
            .then((res) => {
                console.log("data sent");
                toast.success("Registration successful!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            })
            .catch((err) => {
                console.log(err);
                toast.error("incorrect otp")
            });
    }


    return (
        <>
            <ToastContainer className="custom-toast-container" />
            <form method="post" onSubmit={handleSubmit}>
                <div className="main_container">
                    <div className="container">
                        <label htmlFor="email"><b>Enter OTP recieved in your mail</b></label>
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
export default EnterOtp