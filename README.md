# NewsFeed Application

NewsFeed is a React-based web application that aggregates and displays news articles from various sources. Users can browse news articles, search for specific topics, and view detailed information about each article.
Major breakthrough I had when doing this project was a backend CORS issue to send fetch requests to various services. Found 2 separate solutions for it over the course of completing these WEC GDG tasks.

![image](https://github.com/user-attachments/assets/3e19db87-754c-469a-86ee-9d2e5ac034ba)


https://github.com/user-attachments/assets/baf9ee7b-34af-4dff-b9aa-68c8b99aaa4c


## Features

- Browse news articles by category
- Search for news articles
- View detailed information about each article
- Responsive design
- User Authentication
- Personalization of News Articles over time using Keyword Extraction

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/newsfeed.git
    cd newsfeed
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `public/`: Contains static files such as `index.html`, `manifest.json`, and `robots.txt`.
- `src/`: Contains the source code of the application.
  - `components/`: Contains React components like `NewsApp`, `NewsCard`, `NavBar`, and `SearchBar`.
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.
  - `App.css`: Main stylesheet for the application.

## Dependencies

- React
- Axios
- Express
- Mongoose
- CORS

## References
- https://www.youtube.com/watch?v=-FldHnejaA4 (JS News App project. i rebuilt the app in react and further worked on it to added login functionality, keyword extraction, and improved styling)
    - https://github.com/Anuj-Kumar-Sharma/Web-Development-Course/tree/master/learnjs/15.%20News%20App (his github) 

