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
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h2>Are you sure you want to log out?</h2>
          <p className="lead">
            Click the button below to logout from your account.
          </p>
          <button
            className="btn btn-lg  btn-danger"
            onClick={() => handleLogout()}
          >
            {" "}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
