import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { GroupingContext } from "../ContextApi/Context";
import control from "../Images/Display.svg";

export default function Navbar() {
  const { setGrouping } = useContext(GroupingContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const savedGrouping = localStorage.getItem("userGrouping");
    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
  }, [setGrouping]);

  function onPrirorty(val) {
    localStorage.setItem("userGrouping", val);
    setGrouping(val);
    setIsOpen(false);
  }

  return (
    <div className="navbarContainer">
      <div className="dropdown">
        <div className="displayDiv">
          <img className="control" src={control} alt="ctrl" />
          <button className="dropdown-button" onClick={toggleDropdown}>
            Display
          </button>
        </div>

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
            <div className="dropdown-item">
              <p>Grouping</p>
              <button onClick={() => onPrirorty("status")}>Status </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
