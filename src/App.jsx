import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TvShows from './components/TvShows'
import Peoples from './components/Peoples'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/partials/Trailer'
import NotFound from './components/NotFound'
import SeasonDetails from './components/SeasonDetails'
import EpisodeDetails from './components/EpisodeDetails'

const App = () => {
  return (
    <div className='bg-[#1F1E24] flex w-screen h-screen'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/trending" element={<Trending/>} />
        <Route path="/popular" element={<Popular/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movie/details/:id" element={<MovieDetails/>} >
          <Route
              path="/movie/details/:id/trailer"
              element={<Trailer />}
          />
        </Route>
        <Route path="/tv" element={<TvShows/>} />
        <Route path="/tv/details/:id" element={<TvDetails/>} >
          <Route
              path="/tv/details/:id/trailer"
              element={<Trailer />}
          />
        </Route>
        <Route path="/tv/details/:id/season/:seasonnumber" element={<SeasonDetails />}>
          <Route
            path="/tv/details/:id/season/:seasonnumber/episode/:episodenumber"
            element={<EpisodeDetails/>}
          />
          <Route
              path="/tv/details/:id/season/:seasonnumber/trailer"
              element={<Trailer />}
          />
        </Route>
        <Route path="/people" element={<Peoples/>} />
        <Route path="/people/details/:id" element={<PersonDetails/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App