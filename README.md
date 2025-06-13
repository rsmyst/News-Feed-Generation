# NewsFeed - Personalized News Application

A modern news aggregation application built with React, TypeScript, and Vite that delivers personalized news content based on user interests and search preferences.

## Features

- **Real-time News Access**: Browse the latest news from various sources using the NewsAPI
- **Personalized Content**: Automatically tracks your interests based on browsing history
- **User Authentication**: Create an account to save your preferences
- **Keyword Analysis**: Extract and display relevant keywords from articles
- **Category Filters**: Quick access to popular news categories like Blockchain, Memes, and Politics
- **Search Functionality**: Find specific news with the search feature
- **Responsive Design**: Built with Tailwind CSS for a fully responsive experience
- **Dark/Light Mode**: Toggle between dark and light themes

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Local storage-based authentication (with Next-Auth components)
- **API Requests**: Axios
- **Backend**: FastAPI Python server for keyword extraction

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Python 3.12 (for the backend server)
- NewsAPI key (Register at [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Start the Python backend server:
   ```
   py -3.12 server/fastapi_server.py
   ```

### Configuration

The application uses a NewsAPI key for fetching news data. Make sure you have acquired an API key from [newsapi.org](https://newsapi.org).

## Usage

1. Create an account or sign in
2. Browse news categories through the navigation buttons
3. Search for specific news topics using the search bar
4. View recommended keywords based on your browsing history
5. Click on any news card to read the full article

## Development

This project uses Vite for fast development with HMR (Hot Module Replacement).

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
