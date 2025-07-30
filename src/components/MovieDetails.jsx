import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import Loader from './partials/Loader';
import HorizontalCards from './partials/HorizontalCards';
import noimage from '/no-image.png'
import profileimage from '/profile.jpg'

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  console.log(info)

  return info ? (
    <div className='overflow-hidden overflow-y-auto'>
      <div style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8), #1F1E24),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover'
      }}
        className='relative w-screen h-auto overflow-hidden overflow-y-auto'>

        <nav className='w-full text-white px-5 flex items-center justify-between h-10 bg-[rgba(0,0,0,.2)] backdrop-blur border-b-1 border-zinc-300'>
          <i onClick={() => navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i>
          <div>
            <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}><i className="mr-3 ri-external-link-line"> Imdb</i></a>
            <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-line"></i> wiki</a>
          </div>
        </nav>


        <img className='h-[45vh] mx-10 my-5 rounded' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path}`} alt="" />
        <h1 className='text-white text-4xl mx-10 my-3 font-bold'>{info.detail.title || info.detail.name || info.detail.original_title}</h1>
        <h1 className='text-white text-xl mx-10 my-3'>{info.detail.tagline}</h1>
        <p className='text-white text-xs mx-10 w-[80%] md:w-[50%]'>{info.detail.overview}</p>

        <div className='w-[80%] md:w-[40%] text-white text-sm flex justify-between mx-10 my-3'>
          <h1>
            <i className="text-amber-400 ri-star-fill"></i> {info.detail.vote_average > 0 ? (info.detail.vote_average).toFixed(1) : ((info.detail.popularity)/10).toFixed(1) } / 10
          </h1>
          <h1>
            {info.detail.spoken_languages.length == 1 ? info.detail.spoken_languages[0].english_name : (info.detail.spoken_languages.find((m)=>m.name === "English").name)} <span className='text-[#C1121F]'>/ </span>
            <i className="ri-alarm-fill"></i> {info.detail.runtime} MIN <span className='text-[#C1121F]'>/ </span> 
            <i className="ri-calendar-event-fill"></i> {info.detail.release_date.split("-")[0]}
          </h1>
        </div>

        <div className='flex flex-wrap text-sm mx-10 mb-5 text-white'>
          GENRES : {info.detail.genres.map((g,i)=> <p key={i}> <span className='text-[#C1121F]'>|</span> {g.name} </p> )}
        </div>

        <Link to={`${pathname}/trailer`} className='mx-10 hover:bg-[#780000] bg-[#C1121F] text-sm px-3 py-2 rounded text-white'>
          <i className="ri-play-large-line"></i> Play Trailer
        </Link>

      </div>

      <div className='flex w-full items-center p-3'>
      <h1 className='text-zinc-400 text-xl font-black'>Cast</h1>
      <hr className='border-zinc-500 m-2 w-full' />
      </div>
      <div className='w-full gap-2 px-5 flex overflow-hidden overflow-x-auto mx-3'>
        {info.credits.map((c, i)=>
        <Link key={i} to={`/people/details/${c.id}`} className='h-full flex flex-col items-center shrink-0 text-white'>
          <img className='h-[15vh] md:h-[25vh] rounded-full w-[15vh] md:w-[25vh] object-cover' src={c.profile_path ? `https://image.tmdb.org/t/p/original/${c.profile_path}` : noimage } alt="" />
          <h1>{c.name}</h1>
        </Link>
        )}
      </div>

      <div className='flex w-full items-center p-3'>
      <h1 className='text-zinc-400 text-xl font-black'>Images</h1>
      <hr className='border-zinc-500 m-2 w-full' />
      </div>
      <div className='bg-[#1F1E24] w-full scroll-smooth flex overflow-hidden overflow-x-auto'>
        {info.images.map((b, i) => <img className='h-[20vh] md:h-[40vh] rounded my-4 mx-2' key={i} src={`https://image.tmdb.org/t/p/original/${b.file_path}`} alt="" />)}
      </div>

      <div className='flex w-full items-center p-3'>
      <h1 className='text-zinc-400 text-xl font-black text-nowrap'>{info.reviews.length} Reviews</h1>
      <hr className='border-zinc-500 m-2 w-full' />
      </div>
      <div className='bg-[#1F1E24] w-full scroll-smooth flex overflow-hidden overflow-x-auto'>
        {info.reviews.map((r, i) => 
        <Link key={i} to={`/movie/details/${info.detail.id}/review/${r.id}`} className='p-2 w-[80vw] h-[20vh] md:w-[30vw] bg-black rounded-xl m-2 shrink-0'>
        <div className='flex items-center text-zinc-400'>
        <img className='h-[5vh] w-[5vh] md:h-[4vw] md:w-[4vw] rounded-full mx-2' src={r.author_details.avatar_path ? `https://image.tmdb.org/t/p/original/${r.author_details.avatar_path}`: profileimage} alt="" />
        <h1>{r.author}</h1>
        </div>
        <p className='text-zinc-500 text-sm p-2'>{r.content.slice(0,100)}...<span className='text-blue-300'>more</span></p>
        </Link>
      )}
      </div>

      <div className='flex w-full items-center p-3'>
      <h1 className='text-zinc-400 text-xl font-black'>Recommended</h1>
      <hr className='border-zinc-500 m-2 w-full' />
      </div>
        <div className='w-full flex flex-wrap'>
        {info.recommendations.map((r,i)=>
          <Link key={i} to={`/${r.media_type}/details/${r.id}`} className='h-[27vh] md:w-[32vw] w-full rounded flex p-2 m-1 border-1 border-zinc-500'>
            <img className='h-full rounded' src={`https://image.tmdb.org/t/p/original/${r.poster_path}`} alt="" />
            <div className='p-2'>
              <h1 className='font-semibold text-white mb-2'>{r.title || r.name}</h1>
              <p className='text-sm text-zinc-400'>{r.overview.slice(0,100)}...<span className='text-blue-300'>more</span> </p>
            </div>
          </Link>
        )}
        </div>
      <Outlet/>
    </div>
  ) : (
    <Loader />
  )
}

export default MovieDetails