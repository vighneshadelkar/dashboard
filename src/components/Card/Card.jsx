import React, { useContext } from "react";
import "./Card.css";
import userImg from "../Images/user.png";
import { GroupingContext } from "../ContextApi/Context";
import dots from "../Images/3 dot menu.svg";
import inpg from "../Images/in-progress.svg";
import done from "../Images/Done.svg";
import backlog from "../Images/Backlog.svg";

export default function Card(props) {
  const { grouping } = useContext(GroupingContext);

  const getStatusImage = (status) => {
    switch (status) {
      case "In progress":
        return inpg;
      case "Done":
        return done;
      case "Backlog":
        return backlog;
      default:
        return backlog;
    }
  };

  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="cardHeader">
          <div className="cardId">{props.id}</div>
          {grouping !== "user" && (
            <div className="prfImg">
              <img src={userImg} alt="pf" />
            </div>
          )}
        </div>
        <div className="cardBody">
          <div className="box">
            <img src={getStatusImage(props.status)} alt="" />
            <p className="box-text">{props.title}</p>
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
