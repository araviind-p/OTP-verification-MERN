import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function EnterOtp() {
    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:4000/api/v1/signup",otp)
            .then((res) => {
                console.log(res);
                console.log("data sent");
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <>
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
                        <button type="submit"><Link to={'/login'}>Submit</Link></button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default EnterOtp