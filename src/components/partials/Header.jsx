import React from 'react'
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Header = ({data}) => {
  return (
    <div className='flex flex-col h-[60vh] w-full'>
    <Swiper
      direction={'vertical'}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      pagination={{
        // type: "fraction",
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper text-white"
      >
    {data.map((d,i)=>(
    <SwiperSlide key={i}>
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
    </SwiperSlide>
    ))}
    </Swiper>
    </div>
  )
}

export default Header