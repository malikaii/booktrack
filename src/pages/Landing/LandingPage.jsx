import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import ErrorField from "../../components/error/ErrorField";

function LandingPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function onChangeValue(event) {
    setError("")
    const { name, value } = event.target;
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit() {
    const { username, password } = credentials;


    try {

      if(!username || !password) {
        throw new Error("Enter all fields!")
      }
      const res = await fetch(
        `http://localhost:3001/users?username=${username}`
      );
      const data = await res.json();

      if (data.length === 0) throw new Error("User not found!");

      const user = data[0];

      if (user.password !== password) {
        throw new Error("Invalid password");
      }
    } catch (error) {
      setError(error.message);
    }

    setCredentials({
      username: "",
      password: "",
    });

    // navigate("/explore");
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
            <button onClick={handleSubmit} id="login-btn">
              Enter
            </button>
            {error && <ErrorField errorMessage={error}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
