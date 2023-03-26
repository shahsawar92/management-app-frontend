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
    <div>
      {errorMsg && (
        <div className="bg-warn text-danger alert alert-danger">{errorMsg}</div>
      )}
      <h1 className="Contianer">Dashboard</h1>

      <div className="container">
        <div className="col-md-12 border border-1 border-green py-5 my-5">
          <Link
            className="btn btn-lg btn-primary"
            to={"../register?redirect=add"}
          >
            Add User
          </Link>
        </div>
      </div>
      <button
        className="btn btn-lg  btn-primary"
        onClick={() => {
          navigate("/profile");
        }}
      >
        {" "}
        Your Profile
      </button>
      <div className="container">
        <header className="table-title align-start"> All users</header>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {memoizedAllUsers &&
                  memoizedAllUsers?.map((user, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{user?.name}</th>
                        <td>{user?.email} </td>
                        <td>{user?.phone}</td>
                        <td>{user?.role}</td>
                        <td>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => toggleBlockStatus(user._id)}
                          >
                            {user?.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
