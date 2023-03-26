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
  }, [isAdmin]);
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
    <div>
      404 Not found <br /> back to <Link to={"/"}>Login</Link>
    </div>
  );
};
