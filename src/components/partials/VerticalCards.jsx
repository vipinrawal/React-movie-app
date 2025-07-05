import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from './Skeleton'

const VerticalCards = ({data, title}) => {
    return (
        <div className='flex h-full w-full bg-[#1F1E24] gap-4 flex-wrap p-4 justify-center'>
            {data.map((d,i)=>(
                <Link to={`/${d.media_type || title}/details/${d.id}`} style={{
                    backgroundImage:`url(https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path})`,
                    backgroundPosition:'center',
                    backgroundSize:'cover'
                    }} key={i} className='w-[42vw] md:w-[15%] relative rounded h-[30vh] md:h-[40vh] overflow-hidden'>

                    <div className='group h-full text-transparent relative hover:text-white  w-full flex flex-col justify-end p-2 hover:bg-[rgba(0,0,0,.8)] duration-200'>
                        <h1 className='text-xm font-black'>
                            {d.name || d.original_title}
                        </h1>
                        <hr />
                        <h1 className='text-xs'>
                            {d.overview && (
                                d.overview.slice(0,100)+"..."
                            )}

                            { d.known_for && (
                                d.known_for.map((k,i)=>( <p key={i=i+1}>{"Movie " + (i+1) + " : " + (k.title || k.name)}</p> ))
                            )}
                        </h1>
                        {d.vote_average && (
                            <div className='text-sm absolute top-[0] left-0 group-hover:bg-[#C1121F] rounded-br-2xl p-2'>
                                <i className="group-hover:text-amber-400 ri-star-fill"></i> {(d.vote_average).toFixed(1)}
                            </div>
                        )}
                    </div>
                    <h1 className='absolute md:hidden bottom-0 bg-[rgba(0,0,0,.8)] w-full text-white p-2'>{d.name || d.original_title}</h1>
                </Link>
            ))}
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>
    )
}

export default VerticalCards