import React from "react";


// The LeftSideNav component is a side navigation bar on the left side of the display

const LeftSideNav = () => {
  return (
    <div>
			<h1>Left Side Nav Component!</h1>
      <div>
        <ul id="sidenav">
          <li>
            <a href="#">Orders</a>
          </li>
          <li>
            <a href="#">Personal Info</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideNav;
