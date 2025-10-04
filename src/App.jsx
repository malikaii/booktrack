import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Login Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/explore" element={<h1>Explore Page</h1>} />
        <Route path="/create" element={<h1>Create Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
