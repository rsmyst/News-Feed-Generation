import { FC, useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resetFlag?: number; // A number that changes when reset should happen
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, resetFlag = 0 }) => {
  const [query, setQuery] = useState("");

  // Reset the query when resetFlag changes
  useEffect(() => {
    if (resetFlag > 0) {
      setQuery("");
    }
  }, [resetFlag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-64 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 transition-colors duration-200"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-slate-50 text-slate-500 hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-200"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
