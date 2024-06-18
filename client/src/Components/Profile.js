import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state
  console.log("email in profile.......", email);
  console.log("password in profile.......", password);

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [age, setAge] = useState("")
  const [place, setPlace] = useState("")

  const updateUser = () => {
    navigate("/updateUser", { state: { email, password } });
  };
  const handleLogout = () => {
    axios.post("http://127.0.0.1:4000/api/v1/logout")
      .then((res) => {
        toast.success("Logout successful!");
        localStorage.removeItem('token'); // Remove token from local storage
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
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
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios.get(`http://127.0.0.1:4000/api/v1/profile?email=${encodeURIComponent(email)}`, config)
          .then((res) => {
            console.log("reply res.........", res.data);
            setUserEmail(res.data.user.email)
            setUserName(res.data.user.name)
            setAge(res.data.user.age)
            setPlace(res.data.user.place)
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
  }, [email, navigate]);
  return (
    <div>
      <ToastContainer className="custom-toast-container" />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1>USER PROFILE</h1>
          </div>
          <div className="profile-info">
            <p><span className="label">Username:</span> <span id="username">{userName}</span></p>
            <p><span className="label">Email:</span> <span id="email">{userEmail}</span></p>
            <p><span className="label">Age:</span> <span id="age">{age}</span></p>
            <p><span className="label">Place:</span> <span id="place">{place}</span></p>
          </div>
          <div className="profile-actions">
            <button className="update-button" onClick={updateUser}>Update</button>
          </div>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile