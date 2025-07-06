import React from 'react'
import { Link } from "react-router-dom"
import Swiper from "swiper"
import 'swiper/css';

const Header = ({data}) => {
  const swiper = new Swiper('.swiper',)
  return (
    <div className='swiper h-[60vh] w-full'>
    <div className='swiper-wrapper h-[60vh] w-full'>
    {data.map((d,i)=>(
    <div key={i} className='swiper-slide'>
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${d.backdrop_path})`,
      backgroundPosition:'top',
      backgroundSize:'cover'
    }} 
    className='w-full h-[60vh] flex flex-col justify-end items-start p-[5%]'>
      <h1 className='text-4xl font-black text-[#FDF0D5]'>{d.name || d.title || d.original_name}</h1>
      <p className='w-[100%] md:w-[50%] mt-3 text-[#FDF0D5]'>
        {d.overview.slice(0,150)}...<Link to={`/${d.media_type}/details/${d.id}`}className='text-blue-400'> more</Link>
      </p>
      <p className='text-white'>
        <i className="text-blue-400 ri-megaphone-fill"></i> {d.release_date || "No Information"}
        <i className="text-blue-400 ml-2 ri-album-fill"></i> {d.media_type.toUpperCase()}
      </p>
      <Link to={`/${d.media_type}/details/${d.id}/trailer`} className='hover:bg-[#780000] mt-4 bg-[#C1121F] p-3 rounded text-white'>
        <i className="ri-play-large-line"></i> Watch Trailer
      </Link>
    </div>
    </div>
    ))}
    </div>
    </div>
  )
}

export default Header