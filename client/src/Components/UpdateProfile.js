import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateProfile() {

    const [NewEmail, setNewEmail] = useState("");
    const [NewName, setNewName] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state
    console.log("update.......", email, password);


    const handleupdate = (e) => {
        e.preventDefault();
        const data = {
            email: NewEmail,
            name: NewName
        };
        axios.put("http://127.0.0.1:4000/api/v1/updateUser", data)
            .then((res) => {
                console.log("res after update.........", res);
                toast.success("User updated successfully")
                setTimeout(() => {
                    navigate("/profile", { state: { email: NewEmail, name: NewName } });
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        // Fetch user profile on component mount
        const fetchProfile = async () => {
            axios.get(`http://127.0.0.1:4000/api/v1/profile?email=${encodeURIComponent(email)}`)
                .then((res) => {
                    console.log("reply res.........", res.data);
                    setNewEmail(res.data.user.email)
                    setNewName(res.data.user.name)
                }
                )
                .catch((err) => {
                    console.log(err);
                })

        };
        fetchProfile();
    }, [email]);



    return (
        <>
            <ToastContainer className="custom-toast-container" />
            <form method="post" onSubmit={handleupdate}>
                <div className="main_container">
                    <div className="container">
                        <label htmlFor="password"><b>Email</b></label>
                        <input
                            type="text"
                            value={NewEmail}
                            name="email"
                            required
                            readOnly
                            onChange={e => setNewEmail(e.target.value)}
                        />
                        <label htmlFor="email"><b>Name</b></label>
                        <input
                            type="text"
                            value={NewName}
                            name="name"
                            required
                            onChange={e => setNewName(e.target.value)}
                        />
                        <button type="submit" className='update-button'>Update Name</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateProfile