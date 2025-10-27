import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import ErrorField from "../../components/error/ErrorField";
import { useAuth } from "../../Auth/AuthContext.jsx";
import LoadingSpinner from "../../components/spinner/LoadingSpinner.jsx";

function LandingPage() {
  const { login } = useAuth();

  const dbApiUrl = import.meta.env.VITE_API_URL;

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function onChangeValue(event) {
    setError("");
    const { name, value } = event.target;
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit() {
    setLoading(true)
    const { username, password } = credentials;

    try {
      if (!username || !password) {
        throw new Error("Enter all fields!");
      }
      const res = await fetch(
        `${dbApiUrl}/users?username=${username}`
      );

      if (!res.ok) {
        throw new Error("Server responded with status: ", res.status);
      }
      const data = await res.json();

      if (data.length === 0)
        throw new Error("Username does not exist. Try again");

      const user = data[0];

      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      login(user);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      if (error.message === "Failed to fetch") {
        setError("An issue occured when trying to connect to server");
      } else {
        setError(error.message);
      }
    }

    setCredentials({
      username: "",
      password: "",
    });
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
            <button onClick={handleSubmit} id="login-btn" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Login"}
            </button>
            {error && <ErrorField errorMessage={error} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
