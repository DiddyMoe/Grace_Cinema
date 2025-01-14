import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../features/authSlice";
import UsersProfile from "./UserProfile";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

// This is a functional component that handles user authentication and login
const AuthLogin = ({ name, displayName }) => {
  // Get the logged in status and error message from the Redux store
  const loggedIn = useSelector((state) => !!state.auth.me.id);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the auth object from the Redux store
  const auth = useSelector((state) => state.auth);

  // Use the useEffect hook to navigate to the user's profile page if they are logged in
  useEffect(() => {
    if (auth._id) {
      navigate("/users/:id");
    }
  }, [auth._id, navigate]);

  // Handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();
    const formName = ev.target.name;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    dispatch(authenticate({ email, password, method: formName }));
  };

  return (
    <h1>
      Welcome to the LogIn Component!
      <div>
        {loggedIn ? (
          <UsersProfile />
        ) : (
          <form onSubmit={onSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && <div> {error} </div>}
          </form>
        )}
      </div>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </h1>
  );
};

export default AuthLogin;
