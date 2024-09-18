import React, { useContext } from "react";
import "./Card.css";
import userImg from "../Images/user.png";
import { GroupingContext } from "../ContextApi/Context";
import dots from "../Images/three.png";

export default function Card(props) {
  const { grouping } = useContext(GroupingContext);

  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="cardHeader">
          <div className="cardId">{props.id}</div>
          <div className="prfImg">
            <img src={userImg} alt="pf" />
          </div>
        </div>
        <div className="cardBody">
          <div className="box">
            {grouping === "priority" ? (
              <input type="checkbox" name="checkbox" id="checkbox" />
            ) : (
              <></>
            )}
            <p>{props.title}</p>
          </div>
        </div>
        <div className="cardBottom">
          <img src={dots} className="dots" alt="more" />
          <div className="cardTag">
            <div className="circle"></div>
            {props.tag[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
