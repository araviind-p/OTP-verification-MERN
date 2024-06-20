import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [age, setAge] = useState("")
  const [place, setPlace] = useState("")
  const [userId, setUserId] = useState("")

  const navigate = useNavigate();

  const updateUser = () => {
    navigate("/updateUser");
  };

  const handleLogout = () => {
    axios.post("https://otp-verification-mern.onrender.com/api/v1/logout")
      .then((res) => {
        toast.success("Logout successful!");
        localStorage.removeItem('token'); // Remove token from local storage after logout
        localStorage.removeItem('email') //Remove email from local storage after logout
        setTimeout(() => {
          navigate("/");
        }, 1000); //navigate to login page after logout
      })
      .catch((err) => {
        console.log(err);
        toast.error(err)
      })
  }

  const handleDelete = () => {
    axios.delete(`https://otp-verification-mern.onrender.com/api/v1/deleteuser/${userId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("User account deleted");
          localStorage.removeItem('token'); // Remove token from local storage
          localStorage.removeItem('email') //Remove email from local storage
          setTimeout(() => {
            navigate("/");
          }, 1000); // navigate to login page after logout
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("error")
      })
  }

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const email = localStorage.getItem('email') //Retrieve email from local storage
        if (!token || !email) {
          navigate("/"); // Redirect to login if token is missing or email is missing
          return;
        }
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios.get(`https://otp-verification-mern.onrender.com/api/v1/profile?email=${encodeURIComponent(email)}`, config)
          .then((res) => {
            setUserEmail(res.data.user.email)
            setUserName(res.data.user.name)
            setAge(res.data.user.age)
            setPlace(res.data.user.place)
            setUserId(res.data.user._id)
          })
          .catch((err) => {
            console.log(err);
          })
      } catch (error) {
        console.error(error);
        navigate("/"); // Redirect to login on error (e.g: token invalid)
      }

    };
    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <ToastContainer className="custom-toast-container" />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1>USER PROFILE</h1>
          </div>
          <div className="profile-info">
            <p><span className="label">Email:</span> <span id="email">{userEmail}</span></p>
            <p><span className="label">Username:</span> <span id="username">{userName}</span></p>
            <p><span className="label">Age:</span> <span id="age">{age}</span></p>
            <p><span className="label">Place:</span> <span id="place">{place}</span></p>
          </div>
          <div className="profile-actions">
            <button className="update-button" onClick={updateUser}>Update</button>
          </div>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout</button>
      <button className='logout' onClick={handleDelete}>Delete Account</button>
    </div>
  )
}

export default Profile