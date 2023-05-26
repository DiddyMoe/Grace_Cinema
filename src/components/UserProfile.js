import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftSideNav from "./LeftSideNav";
import { logout } from "../features/authSlice";

// UsersProfile component displays the user's profile information
const UsersProfile = () => {
  // Get the current user's email from the Redux store
  const userEmail = useSelector((state) => state.auth.me.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout and redirect to the login page
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      Welcome to your User Profile
      <h2>Welcome, {userEmail}</h2>
      <button type="button" onClick={logoutAndRedirectHome}>
        Logout
      </button>
      <h3>
        <LeftSideNav />
      </h3>
    </div>
  );
};

export default UsersProfile;
