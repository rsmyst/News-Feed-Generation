// VFinal

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";

/**
 * NewsApp component handles the main functionality of the news application.
 * It manages user authentication (login/signup), fetches news articles based on keywords,
 * and displays the news articles and extracted keywords.
 *
 * State Variables:
 * - articles: Array of news articles fetched from the API.
 * - loading: Boolean indicating if the news articles are being loaded.
 * - keywords: Array of extracted keywords from the news articles.
 * - loggedIn: Boolean indicating if the user is logged in.
 * - name: String representing the user's name for login/signup.
 * - password: String representing the user's password for login/signup.
 * - isSignup: Boolean indicating if the user is in signup mode.
 *
 * Functions:
 * - fetchNews(query): Fetches news articles based on the provided query and updates the state.
 * - fetchKeywords(combinedDescriptions): Fetches keywords from the server based on combined descriptions of articles.
 * - handleLogin(): Handles user login by verifying credentials and updating the state.
 * - handleSignup(): Handles user signup by storing new user data and updating the state.
 * - handleLogout(): Handles user logout by updating the state and clearing local storage.
 * - renderLoginSignup(): Renders the login/signup form.
 * - renderNewsApp(): Renders the main news application interface.
 *
 * useEffect:
 * - Fetches news articles based on user keywords or a default query when the user logs in.
 *
 * Returns:
 * - JSX element representing the NewsApp component.
 */
const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const API_KEY = "0ab89508285743fd92e9e78d2b95f818";
  const NEWS_API_URL = "https://newsapi.org/v2/everything?q=";

  const fetchNews = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${NEWS_API_URL}${query}&apiKey=${API_KEY}`
      );
      const articles = response.data.articles;

      const combinedDescriptions = articles
        .slice(0, 10)
        .map((article) => article.description || "")
        .join(" ");

      setArticles(articles);

      await fetchKeywords(combinedDescriptions);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKeywords = async (combinedDescriptions) => {
    try {
      const response = await fetch("/getKeywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: combinedDescriptions }),
      });

      const data = await response.json();
      const newKeywords = data.keywords;

      const currentUser = localStorage.getItem("currentUser");

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const existingUserKeywords = userData[currentUser] || [];
      //Combine existing and new keywords
      const combinedKeywords = [...existingUserKeywords, ...newKeywords];

      // Create a map to store the highest score for each keyword
      const keywordMap = new Map();
      combinedKeywords.forEach(([keyword, score]) => {
        if (keywordMap.has(keyword)) {
          const existingScore = keywordMap.get(keyword);
          keywordMap.set(keyword, Math.max(existingScore, score));
        } else {
          keywordMap.set(keyword, score);
        }
      });
      //Sorting keywords and retaining the top 10
      const sortedKeywords = Array.from(keywordMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      setKeywords(sortedKeywords);

      userData[currentUser] = sortedKeywords;
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching keywords:", error);
      setKeywords([0]);
    }
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (loggedIn && currentUser) {
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const userKeywords = userData[currentUser] || [];
      //Fetch news based on a random keyword the user has
      if (userKeywords.length > 0) {
        const randomKeyword =
          userKeywords[Math.floor(Math.random() * userKeywords.length)][0];
        fetchNews(randomKeyword);
      } else {
        fetchNews("India");
      }
    }
  }, [loggedIn]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.name === name && u.password === password);
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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.name === name);

    if (!existingUser) {
      // Store the new user data
      users.push({ name, password });
      localStorage.setItem("users", JSON.stringify(users));

      // Initialize an empty keywords array for the new user
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
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
  };

  const renderLoginSignup = () => (
    <div className="login-signup-container">
      <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password"
      />
      <button
        onClick={isSignup ? handleSignup : handleLogin}
        className="signupBtn"
      >
        {isSignup ? "Sign Up" : "Log In"}
      </button>
      <button onClick={() => setIsSignup(!isSignup)} className="loginBtn">
        Switch to {isSignup ? "Log In" : "Sign Up"}
      </button>
    </div>
  );

  const renderNewsApp = () => (
    <main>
      <NavBar onNavItemClick={fetchNews} />
      <div className="container">
        <div className="keywords-container">
          {keywords.length > 0 && (
            <>
              <h3>Extracted Keywords:</h3>
              <ul>
                {keywords.map((keyword, index) => (
                  <li key={index}>
                    {keyword[0]} (Score: {keyword[1]})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="cards-container flex">
          {loading ? (
            <p className="loadStatus">Loading...</p>
          ) : (
            articles.map(
              (article, index) =>
                article.urlToImage && <NewsCard key={index} article={article} />
            )
          )}
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </main>
  );

  return (
    <div className="app">
      {loggedIn ? renderNewsApp() : renderLoginSignup()}
    </div>
  );
};

export default NewsApp;
