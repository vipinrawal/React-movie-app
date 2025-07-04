import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadseason, removeseason } from "../store/actions/seasonActions";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import Loader from "./partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";
import noimage from '/no-image.png'


const SeasonDetails = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const seasondetail = useSelector((state) => state.season.info);
    const { info } = useSelector((state) => state.tv)
    const { id, seasonnumber } = useParams();
    const dispatch = useDispatch()
    document.title = "SCSDB | season" + seasonnumber

    useEffect(() => {
        dispatch(asyncloadseason(id, seasonnumber));
        dispatch(asyncloadtv(id));
        return () => {
            dispatch(removeseason());
            dispatch(removetv());
        };
    }, [id, seasonnumber]);

    return seasondetail && info ? (
        <div className='overflow-hidden overflow-y-auto'>
            <div style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8), #1F1E24),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: 'top',
                backgroundSize: 'cover'
            }}
                className='relative w-screen '>

                <nav className='w-full text-white px-5 flex items-center justify-between h-10 bg-[rgba(0,0,0,.2)] backdrop-blur border-b-1 border-zinc-300'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i>
                    <div>
                        <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}><i className="mr-3 ri-external-link-line"> Imdb</i></a>
                        <a className='hover:text-[#CA1823]' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-line"></i> wiki</a>
                    </div>
                </nav>


                <img className='h-[45vh] mx-10 my-5 rounded' src={`https://image.tmdb.org/t/p/original/${seasondetail.detail.poster_path}`} alt="" />
                <h1 className='text-white text-4xl mx-10 my-3 font-bold'>{info.detail.title || info.detail.name}</h1>
                <h1 className='text-white text-xl mx-10 my-3'>Season-{seasondetail.detail.season_number} ({seasondetail.detail.name})</h1>
                <p className='text-white text-xs mx-10 w-[80%]'>{seasondetail.detail.overview}</p>

                <div className='w-[80%] md:w-[40%] text-white text-sm flex justify-between mx-10 my-3'>
                    <h1>
                        <i className="text-amber-400 ri-star-fill"></i> {seasondetail.detail.vote_average > 0 ? (seasondetail.detail.vote_average).toFixed(1) : ((info.detail.popularity) / 10).toFixed(1)} / 10
                    </h1>
                    <h1>
                        {info.detail.spoken_languages[0].english_name} /
                        <i className="ri-alarm-fill"></i> {info.detail.episode_run_time[0]} MIN Episode /
                        <i className="ri-calendar-event-fill"></i> {seasondetail.detail.air_date && seasondetail.detail.air_date.split("-")[0]}
                    </h1>
                </div>

                <div className='flex text-sm mx-10 flex-wrap text-white'>
                    GENRES : {info.detail.genres.map((g, i) => <p key={i}> | {g.name}</p>)}
                </div>

                <div className='flex text-sm mx-10 my-5 text-white flex-col'>
                    <p>Total Episodes : {seasondetail.detail.episodes.length}</p>
                </div>

                <Link to={`${pathname}/trailer`} className='hover:bg-[#780000] w-fit h-fit bg-[#C1121F] text-sm mx-10 flex mb-5 px-3 py-2 rounded text-white'>
                    <i className="ri-play-large-line"></i> Play Trailer
                </Link>

            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Episodes</h1>
            <div className="mx-3 text-zinc-400 w-100% h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl rounded border-2 border-zinc-700 px-3">
                {seasondetail.detail.episodes.map((e, i) =>
                    <Link to={`${pathname}/episode/${e.episode_number}`} key={i} className="flex items-center hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer">
                        <span>
                            {e.episode_number}:
                        </span>
                        <span className="ml-2">
                            {e.name}
                        </span>
                    </Link>
                )}
            </div>


            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Cast</h1>
            <div className='w-full gap-2 px-5 flex overflow-hidden overflow-x-auto mx-3'>
                {seasondetail.credits.map((c, i) =>
                    <Link key={i} to={`/people/details/${c.id}`} className='h-full flex flex-col items-center shrink-0 text-white'>
                        <img className='h-[15vh] md:h-[25vh] rounded-full w-[15vh] md:w-[25vh] object-cover' src={c.profile_path ? `https://image.tmdb.org/t/p/original/${c.profile_path}` : noimage} alt="" />
                        <h1>{c.name}</h1>
                    </Link>
                )}
            </div>

            <hr className='border-zinc-500 mt-2' />
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Images</h1>
            <div className='bg-[#1F1E24] w-full scroll-smooth flex overflow-hidden overflow-x-auto'>
                {seasondetail.images.map((b, i) => <img className='h-[20vh] md:h-[40vh] rounded my-4 mx-2' key={i} src={`https://image.tmdb.org/t/p/original/${b.still_path}`} alt="" />)}
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
            <h1 className='m-3 text-zinc-400 text-xl font-black'>Recommended</h1>
            <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
            <Outlet />
        </div>

    ) : (
        <Loader />
    );
};

export default SeasonDetails