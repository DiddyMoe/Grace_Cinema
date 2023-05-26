import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from '../features/users';

// Users component displays a list of users
const Users = () => {
  // Get users from Redux store
  const users = useSelector(selectUsers);

  return (
    <div>
      <h1>Welcome to the Users Component!</h1>
      {/* Map over users and display their information */}
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h4>First Name: {user.fName}</h4>
            <h4>Last Name: {user.lName}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Type: {user.type}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
