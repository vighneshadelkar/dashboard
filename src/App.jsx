import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [first, setfirst] = useState([]);

  async function fetchData() {
    try {
      const result = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      const data = await result.json();

      if (data) {
        // console.log(data);
        setfirst(data.tickets)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(first[0])
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        {
          first?.map((item)=>{
            return  <Card key={item._id} {...item}></Card>
          })
        }
      </main>
    </div>
  );
}

export default App;
