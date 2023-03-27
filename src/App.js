import "./App.css";
import SignupForm from "./Components/signin.js";
import SigninForm from "./Components/login.js";
import { Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protectedroute";
import Dashboard from "./Components/dashboard";
import UserProfile from "./Components/profile";
import { useEffect, useState } from "react";
import Logout from "./Components/logout";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const checkIsAdmin = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log("userdata:", userData?.role);
    if (userData && userData?.role == "admin") {
      setIsAdmin(true);
    } else setIsAdmin(false);
  };
  useEffect(() => {
    checkIsAdmin();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {isAdmin === true ? <Dashboard /> : <UserProfile />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Oops! That page can’t be found.</h1>
      <p>
        It looks like nothing was found at this location. Maybe try one of the
        links below or a search?
      </p>
      <Link to="/" className="not-found-link">
        Go to Login
      </Link>
    </div>
  );
};
