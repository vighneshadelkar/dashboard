import React, { useContext, useState } from "react";
import "./Navbar.css";
import { GroupingContext } from "../ContextApi/Context";

export default function Navbar() {
  const { setGrouping } = useContext(GroupingContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function onPrirorty(val) {
    setGrouping(val);
    setIsOpen(false);
  }

  return (
    <div className="navbarContainer">
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          Display
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
            <p>Grouping</p>
              <button onClick={() => onPrirorty("user")}>Users</button>
            </div>
            <div className="dropdown-item">
              <p>Grouping</p>
              <button onClick={() => onPrirorty("priority")}>Priority</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
