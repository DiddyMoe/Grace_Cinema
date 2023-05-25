import React from "react";

// The SideNav component displays a side navigation bar
const SideNav = () => {
  const navItems = [
    { name: "Orders", href: "#" },
    { name: "Personal Info", href: "#" },
  ];

  return (
    <div>
      <h1>Welcome to the Side Nav Component!</h1>
      <div>
        <ul id="sidenav">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
