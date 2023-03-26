import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  return (
    <div>
      <div className="container">
        <div className="main-body">
          <h1 className="continer col-md-12 ">Profile</h1>
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{userData?.name}</h4>
                      <p className="text-secondary mb-1">{userData?.role}</p>
                      <p className="text-muted font-size-sm">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      0{userData?.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-lg  btn-danger"
              onClick={() => {
                navigate("/logout");
              }}
            >
              {" "}
              Logout
            </button>{" "}
            <hr />
            {userData?.role === "admin" && (
              <button
                className="btn btn-lg  btn-primary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                {" "}
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
