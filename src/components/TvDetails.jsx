import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import Loader from './partials/Loader';
import HorizontalCards from './partials/HorizontalCards';
import noimage from '/no-image.png'

const tvDetails = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const { info } = useSelector((state) => state.tv);

    useEffect(() => {
        dispatch(asyncloadtv(id));
        return () => {
            dispatch(removetv());
        };
    }, [id]);

    return info ? (
        <div className='overflow-hidden overflow-y-auto'>
            <div style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8), #1F1E24),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: 'top',
                backgroundSize: 'cover'
            }}
                className='relative w-screen overflow-hidden overflow-y-auto'>

                <nav className='w-full text-white px-5 flex items-center justify-between h-10 bg-[rgba(0,0,0,.2)] backdrop-blur border-b-1 border-zinc-300'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i>
                    <div>
                        <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}><i className="mr-3 ri-external-link-line"> Imdb</i></a>
                        <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-line"></i> wiki</a>
                    </div>
                </nav>


                <img className='h-[45vh] mx-10 my-5 rounded' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path}`} alt="" />
                <h1 className='text-white text-4xl mx-10 my-3 font-bold'>{info.detail.title || info.detail.name}</h1>
                <h1 className='text-white text-xl mx-10 my-3'>{info.detail.tagline}</h1>
                <p className='text-white text-xs mx-10 w-[80%]'>{info.detail.overview}</p>

                <div className='w-[80%] md:w-[40%] text-white text-sm flex justify-between mx-10 my-3'>
                    <h1>
                        <i className="text-amber-400 ri-star-fill"></i> {info.detail.vote_average > 0 ? (info.detail.vote_average).toFixed(1) : ((info.detail.popularity) / 10).toFixed(1)} / 10
                    </h1>
                    <h1>
                        {info.detail.spoken_languages[0].english_name} <span className='text-[#C1121F]'>/ </span>
                        <i className="ri-alarm-fill"></i> {info.detail.episode_run_time[0]} MIN Episode <span className='text-[#C1121F]'>/ </span>
                        <i className="ri-calendar-event-fill"></i> {info.detail.first_air_date.split("-")[0]}
                    </h1>
                </div>

                <div className='flex text-sm mx-10 flex-wrap text-white'>
                    GENRES : {info.detail.genres.map((g, i) => <p key={i}> <span className='text-[#C1121F]'>|</span> {g.name}</p>)}
                </div>

                <div className='flex text-sm mx-10 my-5 text-white flex-col'>
                    <p>Total Seasons : {info.detail.number_of_seasons}</p>
                    <p>Total Episodes : {info.detail.number_of_episodes}</p>
                </div>

                <Link to={`${pathname}/trailer`} className='hover:bg-[#780000] bg-[#C1121F] text-sm mx-10 px-3 py-2 rounded text-white'>
                    <i className="ri-play-large-line"></i> Play Trailer
                </Link>

            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>All Seasons</h1>
            <div className='w-full h-[35vh] md:h-[45vh] p-3 mb-10'>
                <div className='flex w-full h-full gap-3 overflow-x-auto pb-2'>
                    {info.detail.seasons.map((d, i) => (
                        <Link to={`/tv/details/${info.detail.id}/season/${d.season_number}`} style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }} key={i} className='shrink-0 w-[20vh] md:w-[14vw] relative rounded h-full overflow-hidden'>
                            <div className='text-sm absolute top-[0] left-0 bg-[#C1121F] text-white rounded-br-2xl p-2'>
                                <i className="text-amber-400 ri-star-fill"></i> {d.vote_average > 0 ? (d.vote_average).toFixed(1) : ((d.popularity) / 10).toFixed(1)}
                            </div>
                            <h1 className='absolute bottom-0 bg-[rgba(0,0,0,.8)] w-full text-sm text-white p-2'>S{d.season_number}:{d.name || d.original_title}</h1>
                        </Link>
                    ))}
                </div>
            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Cast</h1>
            <div className='w-full gap-2 px-5 flex overflow-hidden overflow-x-auto mx-3'>
                {info.credits.map((c, i) =>
                    <Link key={i} to={`/people/details/${c.id}`} className='h-full flex flex-col items-center shrink-0 text-white'>
                        <img className='h-[15vh] md:h-[25vh] rounded-full w-[15vh] md:w-[25vh] object-cover' src={c.profile_path ? `https://image.tmdb.org/t/p/original/${c.profile_path}` : noimage} alt="" />
                        <h1>{c.name}</h1>
                    </Link>
                )}
            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Images</h1>
            <div className='bg-[#1F1E24] w-full scroll-smooth flex overflow-hidden overflow-x-auto'>
                {info.images.map((b, i) => <img className='h-[20vh] md:h-[40vh] rounded my-4 mx-2' key={i} src={`https://image.tmdb.org/t/p/original/${b.file_path}`} alt="" />)}
            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Recommended</h1>
            <div className='w-full flex flex-wrap'>
                {info.recommendations.map((r, i) =>
                    <Link key={i} to={`/${r.media_type}/details/${r.id}`} className='h-[27vh] md:w-[32vw] w-full rounded flex p-2 m-1 border-1 border-zinc-500'>
                        <img className='h-full rounded' src={`https://image.tmdb.org/t/p/original/${r.poster_path}`} alt="" />
                        <div className='p-2'>
                            <h1 className='font-semibold text-white mb-2'>{r.title}</h1>
                            <p className='text-sm text-zinc-400'>{r.overview.slice(0, 100)}...<span className='text-blue-300'>more</span> </p>
                        </div>
                    </Link>
                )}
            </div>
            <Outlet />
        </div>
    ) : (
        <Loader />
    )
}

export default tvDetails