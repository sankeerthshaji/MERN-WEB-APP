import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import EditProfilePage from "./pages/EditProfilePage";
import AdminAddUser from "./pages/AdminAddUser";
import AdminEditUser from "./pages/AdminEditUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const admin = JSON.parse(localStorage.getItem("admin"))
    if (user) {
      dispatch({ type: "USER_LOGIN", payload: user })
    }
    if (admin) {
      dispatch({ type: "ADMIN_LOGIN", payload: admin })
    }
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login"/>} />
            <Route path="/editProfile" element={user ? <EditProfilePage /> : <Navigate to="/login"/>} />
            <Route path="/admin" element={admin ? <AdminHome /> : <Navigate to="/admin/login"/>} />
            <Route path="/admin/login" element={!admin ? <AdminLogin /> : <Navigate to="/admin"/>} />
            <Route path="/admin/addUser" element={admin ? <AdminAddUser /> : <Navigate to="/admin/login"/>} />
            <Route path="/admin/editUser" element={admin ? <AdminEditUser /> : <Navigate to="/admin/login"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
