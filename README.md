# NewsApp

A simple news aggregation web app that fetches the latest news articles from the NewsAPI and displays them based on user preferences. The app allows users to log in, sign up, view news articles, and extract relevant keywords from the article descriptions. These keywords are stored and used to suggest future news articles.

## Features

- **User Authentication**: Users can sign up or log in to access personalized news recommendations.
- **News Fetching**: Fetches news articles using the NewsAPI based on user keywords or a default query.
- **Keyword Extraction**: Extracts keywords from article descriptions and stores them to suggest future news.
- **Persistent Storage**: User data and preferences are saved in localStorage for session persistence.
- **Responsive UI**: Simple user interface with a fixed logout button that fades out upon logging out.

## Installation and Setup

To get the project up and running, follow these steps:

### Prerequisites

Ensure that you have **Node.js** installed. You can download it [here](https://nodejs.org/).

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/NewsApp.git
   cd NewsApp
2. Install the required packages
   ```bash
   npm install

3. Set up an account on [NewsAPI](https://newsapi.org/) and get your API key. Replace the placeholder `API_KEY` in the code with your actual API key.

### Running the App

After installing the necessary packages, you can start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Packages Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the NewsAPI.
- **Node.js**: Used to run the local development server.

### Future Improvements

- Add proper authentication backend.
- Add pagination for news articles.
- Improve the UI/UX with better design components.


This Project was made as a submission for the WEC-2024 GDG Recruitments tasks.
