import { FC, useState, useEffect } from "react";
import SearchBar from "./SearchBar";

interface NavBarProps {
  onNavItemClick: (query: string) => void;
  resetSearchFlag?: number;
}

const NavBar: FC<NavBarProps> = ({ onNavItemClick, resetSearchFlag = 0 }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      // Default to dark mode
      return true;
    }
    return true;
  });

  useEffect(() => {
    // Apply dark mode by default on initial render
    if (isDark && typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { id: "blockchain", label: "Blockchain" },
    { id: "memes", label: "Memes" },
    { id: "politics", label: "Politics" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-bold text-slate-900 dark:text-white cursor-pointer"
                onClick={() => window.location.reload()}
              >
                NewsFeed
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavItemClick(item.label)}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-slate-50 text-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar onSearch={onNavItemClick} resetFlag={resetSearchFlag} />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
