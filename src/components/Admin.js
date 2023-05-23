import React from "react";
import Nav from "./Nav";
import Movies from "./Movies";
import SingleMovie from "./SingleMovie";
import Personnel from "./Personnel";
import SinglePerson from "./SinglePerson";
import UserProfile from "./UserProfile";
import Users from "./Users";
import Cart from "./Cart";
import Orders from "./Orders";
import SideNav from "./SideNav";
import NoPage from "./NoPage";

// This is a functional component that represents the Admin panel
const Admin = () => {
  return (
    <div className="admin-container">
      {/* Add a component to manage users */}
      <Users />
      {/* Add a component to view and manage orders */}
      <Orders />
      {/* Add a component to manage products */}
      <Movies />
      {/* Add a component to manage personnel */}
      <Personnel />
      {/* Add a component to view user profiles */}
      <UserProfile />
      {/* Add a component to manage the shopping cart */}
      <Cart />
    </div>
  );
};

export default Admin;
