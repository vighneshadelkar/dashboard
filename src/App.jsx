import { useContext, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { GroupingContext } from "./components/ContextApi/Context";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const { grouping } = useContext(GroupingContext);

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
    return tickets.reduce((grouped, ticket) => {
      const groupKey = ticket[groupBy] || "Other";
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
      return grouped;
    }, {});
  };

  const groupedTickets = grouping === "user"
    ? groupTickets("userId")
    : grouping === "priority"
    ? groupTickets("priority")
    : groupTickets("status");

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <main>
        <div className="ticketGroups">
          {Object.keys(groupedTickets).map((groupKey) => {
            // Find the user by ID when grouping by user
            const groupTitle = grouping === "user"
              ? users.find((user) => user.id === groupKey)?.name || "Unknown User"
              : groupKey;

            return (
              <div key={groupKey} className="ticketGroup">
                <h3>{groupTitle}</h3>
                <div className="ticketCards">
                  {groupedTickets[groupKey].map((ticket) => (
                    <Card key={ticket.id} {...ticket} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
