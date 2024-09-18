import React, { useContext, useEffect, useState } from "react";
import { GroupingContext } from "../ContextApi/Context";
import Card from "../Card/Card";
import dots from "../Images/three.png"
import "./Feed.css";

export default function Feed() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const { grouping } = useContext(GroupingContext);

  const pri = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  async function fetchData() {
    try {
      const result = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      const data = await result.json();

      if (data) {
        setTickets(data.tickets);
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const groupTickets = (groupBy) => {
    if (groupBy === "user") {
      const userMap = users.reduce((map, user) => {
        map[user.id] = user.name;
        return map;
      }, {});

      return tickets.reduce((grouped, ticket) => {
        const userName = userMap[ticket.userId] || "Unknown User";
        console.log(userName);
        if (!grouped[userName]) {
          grouped[userName] = [];
        }
        grouped[userName].push(ticket);
        return grouped;
      }, {});
    } else {
      return tickets.reduce((grouped, ticket) => {
        const groupKey = ticket[groupBy] || 0;
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
        return grouped;
      }, {});
    }
  };

  const groupedTickets =
    grouping === "user"
      ? groupTickets("user")
      : grouping === "priority"
      ? groupTickets("priority")
      : groupTickets("status");

  return (
    <div className="ticketGroups">
      {Object.keys(groupedTickets).map((groupKey) => {
        // For user grouping, groupKey is the user name
        const groupTitle = grouping === "user" ? groupKey : groupKey;
        console.log(groupTitle);

        return (
          <div key={groupKey} className="ticketGroup">
            <div className="ticketHead">
              <h4>
                {grouping === "priority" ? pri[groupKey] : ""}
                {grouping !== "priority" ? groupTitle : ""}{" "}
                {groupedTickets[groupKey].length}
              </h4>
              <img src={dots} className="dots" alt="more" />
            </div>

            <div className="ticketCards">
              {groupedTickets[groupKey].map((ticket) => (
                <Card key={ticket.id} {...ticket} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
