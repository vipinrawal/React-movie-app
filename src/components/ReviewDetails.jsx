import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import profileimage from '/profile.jpg'


const EpisodeDetails = () => {
    const navigate = useNavigate();
    const { reviewid } = useParams();
    const [reviewdetail, setreviewdetail] = useState(null)

    const GetDetail = async () => {
        try {
            const details = await axios.get(`/review/${reviewid}`)
            setreviewdetail(details.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetDetail();
    }, [reviewid])

    console.log(reviewdetail)
    return (
        <div onClick={() => navigate(-1)} className="bg-[rgba(0,0,0,.7)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="h-[60%] w-[90%] md:w-[60%]  bg-black rounded-xl">
                {reviewdetail ? (
                    <div className="p-3 h-full w-full text-zinc-400">
                        <div className="h-[30%]">
                            <div className='flex items-center '>
                                <img className='h-[5vh] w-[5vh] md:h-[4vw] md:w-[4vw] rounded-full m-2' src={reviewdetail.author_details.avatar_path ? `https://image.tmdb.org/t/p/original/${reviewdetail.author_details.avatar_path}` : profileimage} alt="" />
                                <h1>{reviewdetail.author}</h1>
                            </div>
                            <h1 className="text-sm text-zinc-500 mx-2">Reviewed on : {reviewdetail.updated_at.slice(0,10)}</h1>
                            <h1 className="text-sm text-zinc-500 mx-2">Rated : <i className="text-amber-400 ri-star-fill"></i> {reviewdetail.author_details.rating}/10</h1>
                        </div>
                        <div className="h-[70%] w-full flex overflow-y-auto overflow-hidden border-t-1 border-zinc-500">
                            <p className='text-zinc-500 text-sm p-2'>{reviewdetail.content}</p>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}

export default EpisodeDetails