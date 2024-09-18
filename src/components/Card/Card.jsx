import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="cardHeader">
          <h2>{props.id}</h2>
          <div className="prfImg">profile</div>
        </div>
        <div className="cardBody">
          <div className="box">
            <input type="checkbox" name="checkbox" id="checkbox" />

            <p>{props.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
