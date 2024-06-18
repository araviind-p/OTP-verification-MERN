import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state
  console.log("email in profile.......", email);
  console.log("password in profile.......", password);

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const updateUser = () => {
    navigate("/updateUser", { state: { email, password } });
  };
  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      axios.get(`http://127.0.0.1:4000/api/v1/profile?email=${encodeURIComponent(email)}`)
        .then((res) => {
          console.log("reply res.........", res.data);
          setUserEmail(res.data.user.email)
          setUserName(res.data.user.name)
        }
        )
        .catch((err) => {
          console.log(err);
        })

    };
    fetchProfile();
  }, [email]);
  return (
    <div>
      {/* <h1>Profile</h1>
      <p>Name: {userName} </p>
      <p>Email: {userEmail}</p>
      <div onClick={updateUser}>Update</div> */}
      <div class="profile-container">
        <div class="profile-card">
          <div class="profile-header">
            <h1>USER PROFILE</h1>
          </div>
          <div class="profile-info">
            <p><span class="label">Username:</span> <span id="username">{userName}</span></p>
            <p><span class="label">Email:</span> <span id="email">{userEmail}</span></p>
          </div>
          <div class="profile-actions">
            <button class="update-button" onClick={updateUser}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile