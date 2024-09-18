import React, { useContext } from "react";
import "./Navbar.css";
import { GroupingContext } from "../ContextApi/Context";

export default function Navbar() {
  const { setGrouping } = useContext(GroupingContext);
  function onPrirorty(e) {
    e.preventDefault();
    setGrouping("priority");
  }

  function onUsers(e) {
    e.preventDefault();
    setGrouping("users");
  }
  return (
    <div className="navbarContainer">
      <button onClick={onPrirorty}>proiority</button>
      <button onClick={onUsers}>users</button>
    </div>
  );
}
