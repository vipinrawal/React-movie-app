import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadseason, removeseason } from "../store/actions/seasonActions";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import Loader from "./partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";
import noimage from '/no-image.png'
import axios from "../utils/axios";


const EpisodeDetails = () => {
    const navigate = useNavigate();
    const { id, seasonnumber, episodenumber } = useParams();
    const [episodedetail, setepisodedetail] = useState(null)
    const [episodeimages, setepisodeimages] = useState(null)

    const GetDetail = async () => {
        try {
            const details = await axios.get(`/tv/${id}/season/${seasonnumber}/episode/${episodenumber}`)
            const images = await axios.get(`/tv/${id}/season/${seasonnumber}/episode/${episodenumber}/images`)
            setepisodedetail(details.data)
            setepisodeimages(images.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetDetail();
    }, [episodenumber])

    return (
        <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <Link
                onClick={() => navigate(-1)}
                className="absolute hover:text-[#CA1823] ri-close-fill text-3xl text-white right-[5%] top-[5%]"
            ></Link>

            <div className="h-[60%] md:h-[80%] w-[90%] bg-[#1F1E24] overflow-y-auto overflow-hidden rounded">
            {episodedetail && episodeimages ?( 
                <div className="py-3">
                <img className='h-[20vh] mx-5 my-5 rounded' src={`https://image.tmdb.org/t/p/original/${episodedetail.still_path}`} alt="" />
                <h1 className='text-white text-xl mx-5 my-3 font-bold'>{episodedetail.name}</h1>
                <h1 className='text-white text-xl mx-5 my-3'>Episode-{episodedetail.episode_number}</h1>
                <p className='text-white text-xs mx-5 w-[80%]'>{episodedetail.overview}</p>
                <p className="text-white text-sm mx-5 mt-5">
                    <i className="ri-alarm-fill"></i>duration- {episodedetail.runtime} Minutes
                </p>
                <p className="text-white text-sm mx-5">
                    <i className="ri-calendar-event-fill"></i>Air date- {episodedetail.air_date}
                </p>
                <div>
                    <hr className='border-zinc-500 mt-2' />
                    <h1 className='m-2 text-zinc-400 text-xl font-black'>Images</h1>
                    <div className='bg-[#1F1E24] w-full scroll-smooth flex overflow-hidden overflow-x-auto'>
                        {episodeimages.stills.map((b, i) => <img className='h-[20vh] md:h-[40vh] rounded my-4 mx-2' key={i} src={`https://image.tmdb.org/t/p/original/${b.file_path}`} alt="" />)}
                    </div>
                </div>
                </div>
            ):(
                <Loader/>
            )} 
            </div>
        </div>
    )
}

export default EpisodeDetails