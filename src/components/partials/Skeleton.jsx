import React from 'react'

const Skeleton = () => {
    return (
        <div className='w-[42vw] md:w-[15%] relative rounded h-[30vh] md:h-[40vh] overflow-hidden'>
            <div className='h-full w-full flex flex-col justify-end p-2 animate-pulse bg-[rgba(0,0,0,.6)]'>
                <div className='animate-pulse w-full flex h-full justify-center items-center text-5xl text-zinc-400'><i class="ri-image-fill"></i></div>
                <h1 className='animate-pulse bg-zinc-400 h-[5%] w-[90%]'></h1>
                <hr className='animate-pulse w-full border-zinc-400 my-2' />
                <h1 className='animate-pulse bg-zinc-400 h-[3%] w-[90%] my-[2px]'></h1>
                <h1 className='animate-pulse bg-zinc-400 h-[3%] w-[85%] my-[2px]'></h1>
                <h1 className='animate-pulse bg-zinc-400 h-[3%] w-[80%] my-[2px]'></h1>
                <div className='animate-pulse text-sm absolute top-[0] w-[30%] md:w-[3.5vw] left-0 bg-[#C1121F] rounded-br-2xl p-2'>
                    <i className="text-amber-400 ri-star-fill"></i>
                </div>
            </div>
        </div>
    )
}

export default Skeleton