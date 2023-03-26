import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    console.log("called");
  };
  return (
    <button className="btn btn-lg  btn-danger" onClick={() => handleLogout()}>
      {" "}
      Logout
    </button>
  );
}
