import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Feed from "./components/Feed/Feed";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <Feed />
      </main>
    </div>
  );
}
export default App;
