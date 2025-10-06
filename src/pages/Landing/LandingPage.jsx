import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  // const navigate = useNavigate();

  function onChangeValue(event) {
    const {name, value} = event.target    
    setCredentials(prevValue => ({...prevValue, [name]: value}))
  }

  function handleSubmit() {
    console.log(credentials);
    
    // navigate("/explore")
    
  }

  return (
    <>
      <div className="landing-container">
        <div className="graphic-container">
          <div>
            {/* <h2>A new experience for readers</h2> */}
            <div></div>
          </div>
        </div>
        <div className="login-container">
          <div className="login-content">
            <h1>Welcome!</h1>
            <p>Login to get access to booktracker!</p>
            <div className="login-fields">
              <input
                onChange={onChangeValue}
                name="username"
                value={credentials?.username}
                type="text"
                placeholder="Username"
              />
              <input
                onChange={onChangeValue}
                name="password"
                value={credentials?.password}
                type="password"
                placeholder="Password"
              />
            </div>
            <button onClick={handleSubmit} id="login-btn">Enter</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
