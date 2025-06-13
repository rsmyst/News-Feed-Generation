import { FC, useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

interface Article {
  urlToImage: string;
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

interface NewsAppProps {
  initialQuery?: string;
  onLogout?: () => void;
}

const NewsApp: FC<NewsAppProps> = ({ initialQuery = "", onLogout }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState<[string, number][]>([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check if user is already logged in from localStorage
    return localStorage.getItem("currentUser") !== null;
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("technology"); // Default search term

  const API_KEY = "0ab89508285743fd92e9e78d2b95f818";
  const NEWS_API_URL = "https://newsapi.org/v2/everything?q=";
  const KEYWORD_API_URL = "http://localhost:3005/getKeywords"; // Updated to point to FastAPI server

  const fetchNews = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${NEWS_API_URL}${query}&apiKey=${API_KEY}`
      );
      const articles = response.data.articles;

      const combinedDescriptions = articles
        .slice(0, 10)
        .map((article: Article) => article.description || "")
        .join(" ");

      setArticles(articles);
      await fetchKeywords(combinedDescriptions);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKeywords = async (combinedDescriptions: string) => {
    try {
      const response = await axios.post(KEYWORD_API_URL, {
        text: combinedDescriptions,
      });

      const newKeywords = response.data.keywords;

      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) return;

      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const existingUserKeywords = userData[currentUser] || [];

      // LRU implementation: Create a Map to maintain insertion order
      // First add new keywords (most recent)
      let lruKeywords = new Map<string, number>();

      // Add new keywords first (most recent)
      for (const [keyword, score] of newKeywords) {
        lruKeywords.set(keyword, score);
      }

      // Then add existing keywords that aren't duplicates
      for (const [keyword, score] of existingUserKeywords) {
        if (!lruKeywords.has(keyword)) {
          lruKeywords.set(keyword, score);
        }
      }

      // Convert to array and keep only the 10 most recent keywords
      // Since Map preserves insertion order, we just take the first 10 entries
      const recentKeywords = Array.from(lruKeywords.entries()).slice(0, 10);

      setKeywords(recentKeywords);

      // Store in localStorage
      userData[currentUser] = recentKeywords;
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching keywords:", error);
      setKeywords([]);
    }
  };

  // Add useEffect to handle initialQuery changes
  useEffect(() => {
    if (initialQuery && loggedIn) {
      setSearchQuery(initialQuery);
      fetchNews(initialQuery);
    }
  }, [initialQuery, loggedIn]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (loggedIn && currentUser) {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const userKeywords = userData[currentUser] || [];
      if (userKeywords.length > 0 && !initialQuery) {
        const randomKeyword =
          userKeywords[Math.floor(Math.random() * userKeywords.length)][0];
        fetchNews(randomKeyword);
      } else if (!initialQuery) {
        fetchNews("technology");
      }
    }
  }, [loggedIn]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { name: string; password: string }) =>
        u.name === name && u.password === password
    );
    if (user) {
      setLoggedIn(true);
      localStorage.setItem("currentUser", name);
      setName("");
      setPassword("");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: { name: string }) => u.name === name);

    if (!existingUser) {
      users.push({ name, password });
      localStorage.setItem("users", JSON.stringify(users));

      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData[name] = [];
      localStorage.setItem("userData", JSON.stringify(userData));

      setLoggedIn(true);
      localStorage.setItem("currentUser", name);
      setName("");
      setPassword("");
    } else {
      alert("User already exists. Please log in.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("currentUser");

    // Reset the state to initial values
    setArticles([]);
    setKeywords([]);
    setSearchQuery("technology");

    // Reset the search query in the parent component
    if (onLogout) {
      onLogout();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const renderLoginSignup = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            {isSignup ? "Create your account" : "Sign in to your account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="group relative w-full flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Switch to {isSignup ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderNewsApp = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Keywords
              </h3>
              {keywords.length > 0 ? (
                <ul className="space-y-2">
                  {keywords.map(([keyword, score], index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-slate-700 dark:text-slate-300"
                    >
                      <span>{keyword}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {score.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">
                  No keywords available
                </p>
              )}
            </div>
          </div>
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(
                  (article, index) =>
                    article.urlToImage && (
                      <NewsCard key={index} article={article} />
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="fixed bottom-8 right-8 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-lg transition-colors duration-200"
        >
          Log Out
        </button>
      </main>
    </div>
  );

  return loggedIn ? renderNewsApp() : renderLoginSignup();
};

export default NewsApp;
