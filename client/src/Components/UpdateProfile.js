import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateProfile() {

    const [NewEmail, setNewEmail] = useState("");
    const [NewName, setNewName] = useState("");
    const [NewAge, setNewAge] = useState("")
    const [NewPlace, setNewPlace] = useState("")

    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state
    console.log("update.......", email, password);


    const handleupdate = (e) => {
        e.preventDefault();
        const data = {
            email: NewEmail,
            name: NewName,
            age: NewAge,
            place: NewPlace
        };
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        axios.put("https://otp-verification-mern.onrender.com0/api/v1/updateUser", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true // Include cookies in the request
            }
        )
            .then((res) => {
                console.log("res after update.........", res);
                toast.success("User updated successfully")
                setTimeout(() => {
                    navigate("/profile", { state: { email: NewEmail, name: NewName, age: NewAge, place: NewPlace } });
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err)
            })
    }

    useEffect(() => {
        // Fetch user profile on component mount
        const fetchProfile = async () => {

            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                if (!token) {
                    navigate("/"); // Redirect to login if token is missing
                    return;
                }
                axios.get(`https://otp-verification-mern.onrender.com0/api/v1/profile?email=${encodeURIComponent(email)}`)
                    .then((res) => {
                        console.log("reply res.........", res.data);
                        setNewEmail(res.data.user.email)
                        setNewName(res.data.user.name)
                        setNewAge(res.data.user.age)
                        setNewPlace(res.data.user.place)
                    }
                    )
                    .catch((err) => {
                        console.log(err);
                    })
            } catch (error) {
                console.error(error);
                navigate("/"); // Redirect to login on error (e.g., token invalid)
            }

        };
        fetchProfile();
    }, [email,navigate]);



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
                        <label htmlFor="age"><b>Age</b></label>
                        <input
                            type="number"
                            value={NewAge}
                            name="age"
                            required
                            onChange={e => setNewAge(e.target.value)}
                        />
                        <label htmlFor="age"><b>Place</b></label>
                        <input
                            type="text"
                            value={NewPlace}
                            name="place"
                            required
                            onChange={e => setNewPlace(e.target.value)}
                        />
                        <button type="submit" className='update-button'>Update</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateProfile