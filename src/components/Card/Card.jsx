import React, { useContext } from "react";
import "./Card.css";
import userImg from "../Images/user.png";
import { GroupingContext } from "../ContextApi/Context";

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
            {grouping==="priority" ? (
              <input type="checkbox" name="checkbox" id="checkbox" />
            ) : (
              <></>
            )}

            <p>{props.title}</p>
          </div>
          <div className="cardTag">{props.tag[0]}</div>
        </div>
      </div>
    </div>
  );
}
