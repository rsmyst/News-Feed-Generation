// VFinal

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";

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

      // Combine descriptions from the first 10 articles
      const combinedDescriptions = articles
        .slice(0, 10)
        .map((article) => article.description || "")
        .join(" ");

      // Set the articles to the state
      setArticles(articles);

      // Send the combined descriptions to the Node backend
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
      const newKeywords = data.keywords; // Assume this is an array of [keyword, score]

      // Get the current user from local storage
      const currentUser = localStorage.getItem("currentUser");

      // Get existing keywords from local storage
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const existingUserKeywords = userData[currentUser] || [];

      // Combine and deduplicate keywords
      const combinedKeywords = [...existingUserKeywords, ...newKeywords];

      // Convert combined keywords to a Map for deduplication and scoring
      const keywordMap = new Map();
      combinedKeywords.forEach(([keyword, score]) => {
        if (keywordMap.has(keyword)) {
          const existingScore = keywordMap.get(keyword);
          // Update score if the new score is higher
          keywordMap.set(keyword, Math.max(existingScore, score));
        } else {
          keywordMap.set(keyword, score);
        }
      });

      // Convert the Map back to an array and sort it by score
      const sortedKeywords = Array.from(keywordMap.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by score in descending order
        .slice(0, 10); // Keep only the top 5 keywords

      // Update the state
      setKeywords(sortedKeywords);

      // Store the updated keywords in local storage for the current user
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
      localStorage.setItem("currentUser", name); // Store the logged-in user
      // Clear inputs after successful login
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
      userData[name] = []; // Initialize with no keywords
      localStorage.setItem("userData", JSON.stringify(userData));

      setLoggedIn(true);
      localStorage.setItem("currentUser", name); // Store the logged-in user
      // Clear inputs after successful signup
      setName("");
      setPassword("");
    } else {
      alert("User already exists. Please log in.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("currentUser"); // Remove the current user on logout
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
