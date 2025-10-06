import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <>
    {
      isLoggedIn && <Navbar />
    }
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/explore" element={<h1>Explore Page</h1>} />
        <Route path="/create" element={<h1>Create Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
