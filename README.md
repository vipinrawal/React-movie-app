# 🎬 React Movie App

A modern movie and TV-show discovery application built with **React**, powered by the **TMDB API**. Explore trending titles, browse movies and TV shows, search for people, and view detailed information about titles, seasons, episodes, and cast members.

<p align="center">
  <a href="https://react-movie-app-y3by.onrender.com/">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20App-8A2BE2?style=for-the-badge&logo=render&logoColor=white" alt="Live demo" />
  </a>
  <a href="https://github.com/vipinrawal/React-movie-app">
    <img src="https://img.shields.io/badge/GitHub-Source%20Code-181717?style=for-the-badge&logo=github" alt="GitHub repository" />
  </a>
</p>

## 🌐 Live Demo

**Try the application:** https://react-movie-app-y3by.onrender.com/

## 📸 Screenshots

### Home page

The preview below is captured from the deployed application. It may take a little time to load if the Render service is waking up.

[![React Movie App — Home page](https://image.thum.io/get/width/1200/crop/900/noanimate/https://react-movie-app-y3by.onrender.com/)](https://react-movie-app-y3by.onrender.com/)

> To add permanent screenshots to this repository, save desktop and mobile captures in `docs/screenshots/` and replace the preview above with repository image paths.

## ✨ Features

- **Discover movies and TV shows** — browse trending and popular entertainment.
- **Movie and TV details** — explore title information and related content.
- **Search and discovery** — find movies, shows, and people.
- **People profiles** — view information about cast and crew.
- **Season and episode pages** — navigate TV-show seasons and episode details.
- **Trailers and reviews** — access available trailers and review information.
- **Responsive interface** — browse the application across different screen sizes.
- **Centralized state management** — Redux Toolkit manages application data.
- **Client-side navigation** — React Router handles page navigation.

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| Vite | Development server and production build |
| Redux Toolkit & React Redux | Application state management |
| React Router | Client-side routing |
| Axios | HTTP requests to the TMDB API |
| Tailwind CSS | Styling and responsive layouts |
| Swiper | Interactive sliders and carousels |
| React Player | Media playback |
| React Infinite Scroll Component | Infinite scrolling |

## 📁 Project Structure

```text
React-movie-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI and page components
│   ├── store/              # Redux store, actions and slices
│   ├── utils/              # Shared utilities and API configuration
│   ├── App.jsx             # Application routes and root component
│   └── main.jsx            # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Folder names may evolve as the project is updated.*

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A TMDB account and API access token

### 1. Clone the repository

```bash
git clone https://github.com/vipinrawal/React-movie-app.git
cd React-movie-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the TMDB API token

Create a `.env` file in the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
```

Configure the application to read the token from `import.meta.env.VITE_TMDB_ACCESS_TOKEN` in its API client. **Never commit your real API token or put it in source control.** Vite environment variables are included in the client-side bundle, so they are not secret; for stronger protection, route TMDB requests through a backend service.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

### 5. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎞️ Data Source

Movie, TV-show, and people information is provided by the [TMDB API](https://developer.themoviedb.org/docs).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## 🔮 Possible Improvements

- Add automated tests for key user flows.
- Improve accessibility and keyboard navigation.
- Add skeleton loading states and more detailed error handling.
- Add user watchlists and favourites.
- Add a backend proxy to keep API credentials out of the frontend bundle.

## 👨‍💻 Author

**Vipin Rawal**

- GitHub: [@vipinrawal](https://github.com/vipinrawal)
- Project repository: [React Movie App](https://github.com/vipinrawal/React-movie-app)
- Live application: [react-movie-app-y3by.onrender.com](https://react-movie-app-y3by.onrender.com/)

---

If you find this project useful, consider giving the repository a ⭐.
