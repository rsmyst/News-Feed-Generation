import { useState } from "react";
import NavBar from "./components/NavBar";
import NewsApp from "./components/NewsApp";
import "./App.css";

function App() {
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [searchResetCounter, setSearchResetCounter] = useState<number>(0);

  const handleNavItemClick = (query: string) => {
    setCurrentQuery(query);
    return query;
  };

  // Add a function to reset the query
  const resetQuery = () => {
    setCurrentQuery("");
    // Increment counter to trigger search bar reset
    setSearchResetCounter((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <NavBar
        onNavItemClick={handleNavItemClick}
        resetSearchFlag={searchResetCounter}
      />
      <main className="main-content">
        <NewsApp initialQuery={currentQuery} onLogout={resetQuery} />
      </main>
    </div>
  );
}

export default App;
