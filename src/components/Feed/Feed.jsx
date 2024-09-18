import React, { useContext, useEffect, useState, useMemo } from "react";
import { GroupingContext } from "../ContextApi/Context";
import Card from "../Card/Card";
import dots from "../Images/3 dot menu.svg";
import plus from "../Images/add.svg";
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
    const userMap = users.reduce((map, user) => {
      map[user.id] = user.name;
      return map;
    }, {});

    return tickets.reduce((grouped, ticket) => {
      const groupKey =
        groupBy === "user"
          ? userMap[ticket.userId] || "Unknown User"
          : ticket[groupBy] || 0;

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
      return grouped;
    }, {});
  };

  const groupedTickets = useMemo(() => {
    return grouping === "user"
      ? groupTickets("user")
      : grouping === "priority"
      ? groupTickets("priority")
      : groupTickets("status");
  }, [grouping, tickets, users]);

  return (
    <div className="ticketGroups">
      {Object.keys(groupedTickets).map((groupKey) => (
        <TicketGroup
          key={groupKey}
          groupKey={grouping === "priority" ? pri[groupKey] : groupKey}
          tickets={groupedTickets[groupKey]}
        />
      ))}
    </div>
  );
}

const TicketGroup = React.memo(({ groupKey, tickets, grouping }) => (
  <div className="ticketGroup">
    <div className="ticketHead">
      <h4>
        {groupKey} {tickets.length}
      </h4>
      <div className="ticketImg">
        <img src={plus} className="plus" alt="pls" />
        <img src={dots} className="dots" alt="more" />
      </div>
    </div>
    <div className="ticketCards">
      {tickets.map((ticket) => (
        <Card key={ticket.id} {...ticket} />
      ))}
    </div>
  </div>
));
