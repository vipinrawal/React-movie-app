import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCards = ({ data }) => {
    return (
        <div className='w-full h-[35vh] md:h-[45vh] p-3 mb-10'>
            <div className='flex w-full h-full gap-3 overflow-x-auto pb-2'>
                {data.map((d, i) => (
                    <Link to={`/${d.media_type}/details/${d.id}`} style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }} key={i} className='shrink-0 w-[20vh] md:w-[14vw] relative rounded h-full overflow-hidden'>

                        <div className='relative group h-full text-transparent hover:text-white  w-full flex flex-col justify-end p-2 hover:bg-[rgba(0,0,0,.8)] duration-200'>
                            <h1 className='text-xm font-black'>
                                {d.name || d.title || d.original_title}
                            </h1>
                            <hr />
                            {d.overview && (
                                <p className='text-xs'>
                                    {d.overview.slice(0, 100)}...
                                </p>
                            )}
                            {(
                                <div className='text-sm absolute top-[0] left-0 bg-[#C1121F] text-white md:text-transparent md:group-hover:text-white md:bg-transparent md:group-hover:bg-[#C1121F] rounded-br-2xl p-2'>
                                    <i className="text-amber-400 md:text-transparent md:group-hover:text-amber-400 ri-star-fill"></i> {d.vote_average > 0 ? (d.vote_average).toFixed(1) : ((d.popularity)/10).toFixed(1) }
                                </div>
                            )}
                        </div>
                        <h1 className='absolute md:hidden bottom-0 bg-[rgba(0,0,0,.8)] w-full text-white p-2'>{d.name || d.title || d.original_title}</h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HorizontalCards