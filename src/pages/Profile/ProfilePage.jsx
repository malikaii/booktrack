import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProfilePage() {
  const dbApiUrl = import.meta.env.VITE_API_URL;

  const date = new Date();
  const todaysDate = date.toUTCString().substring(0, 16);
  const [user, setUser] = useState()

  const tableData = ["User Id", "Name", "Email", "Phone"];

  const getUserData = async () => {
    try {
      const res = await fetch(`${dbApiUrl}/users?username=joeJohn`);
      const data = await res.json();
      const user = data[0];
      setUser(user)

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=> {
    getUserData()
  }, [])

  return (
    <>
      <div className="profile-container">
        <div id="bio-section">
          <div className="bio-img">
            <img
              className="bio-pic"
              src="https://revgineer.com/wp-content/uploads/2019/12/ThisPersonDoesNotExist_fail2.jpg"
              alt="profile-pic"
            />
          </div>
          <div>
            <p id="bio-title">Current Stats</p>
            <div id="bio-body">
              <p>User since: {todaysDate}</p>
            </div>
          </div>
        </div>
        <div id="info-section">
          <div className="info-heading">
            <div>
              <h1 className="title-header-t">{user?.name}</h1>
              <p>Occupation</p>
            </div>
            <div id="edit-btn">
              <Link className="edit-link">Edit Profile <FaEdit /></Link>
            </div>
          </div>
          <div className="info-body">
            <h2>About</h2>
            <div class="table-container">
              {tableData.map((rowItem, i) => (
                <div class="table-row">
                  <div class="table-cell">{rowItem}</div>
                  <div class="table-cell">Answer</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
