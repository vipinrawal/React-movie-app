import React from 'react'
import { Link } from "react-router-dom"

const Header = ({data}) => {
  return (
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
      backgroundPosition:'top',
      backgroundSize:'cover'
    }} 
    className='w-full h-[60vh] flex flex-col justify-end items-start p-[5%]'>
      <h1 className='text-4xl font-black text-[#FDF0D5]'>{data.name || data.title || data.original_name}</h1>
      <p className='w-[100%] md:w-[50%] mt-3 text-[#FDF0D5]'>
        {data.overview.slice(0,150)}...<Link to={`/${data.media_type}/details/${data.id}`}className='text-blue-400'> more</Link>
      </p>
      <p className='text-white'>
        <i className="text-blue-400 ri-megaphone-fill"></i> {data.release_date || "No Information"}
        <i className="text-blue-400 ml-2 ri-album-fill"></i> {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='hover:bg-[#780000] mt-4 bg-[#C1121F] p-3 rounded text-white'>
        <i className="ri-play-large-line"></i> Watch Trailer
      </Link>
    </div>
  )
}

export default Header