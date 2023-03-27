import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [errorMsg, seterrorMsg] = useState("");
  const [allUsers, setallUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("all user: ", allUsers);
  useEffect(() => {
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: "http://localhost:3000/getallusers",
    })
      .then(function (res) {
        console.log("got alll:", res);
        if (res?.data?.success) {
          seterrorMsg("");
        }
        setallUsers(res?.data?.data);
      })
      .catch(function (res) {
        seterrorMsg(res?.response?.data?.message);
        setallUsers([]);
      });
  }, []);

  const toggleBlockStatus = (userId) => {
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `http://localhost:3000/toggleblock?id=${userId}`,
    })
      .then(function (res) {
        if (res?.data?.success) {
          seterrorMsg("");
          // update the allUsers state with the updated user data
          setallUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId
                ? { ...user, isBlocked: !user.isBlocked }
                : user
            )
          );
        }
      })
      .catch(function (res) {
        seterrorMsg(res?.response?.data?.message);
      });
  };

  const memoizedAllUsers = useMemo(() => allUsers, [allUsers]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title mb-4">Add User</h5>
              <Link to="../register?redirect=add" className="btn btn-primary">
                Add User
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title mb-4">Profile</h5>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">All Users</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {memoizedAllUsers &&
                  memoizedAllUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          type="button"
                          className={`btn ${
                            user.isBlocked ? "btn-danger" : "btn-success"
                          }`}
                          onClick={() => toggleBlockStatus(user._id)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
