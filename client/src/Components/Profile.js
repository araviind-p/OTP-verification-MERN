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
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {userName} </p>
      <p>Email: {userEmail}</p>
      <div onClick={updateUser}>Update</div>
      {/* Password should not be displayed in plain text in a real application */}
    </div>
  )
}

export default Profile