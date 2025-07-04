import { Link } from "react-router-dom"

const Bottomnav = () => {
    return (
        <div className='md:hidden text-[#FDF0D5] text-3xl flex justify-evenly p-2 border-t-1 border-zinc-400 bg-[#1F1E24] bottom-[0%] fixed w-full h-[7vh]'>
            <Link to={"trending"}>
            <i className="ri-fire-fill"></i>
            </Link>
            <Link to={"popular"}>
            <i className="ri-bard-fill mr-2"></i>
            </Link>
            <Link to={"movies"}>
            <i className="ri-movie-2-line mr-2"></i>
            </Link>
            <Link to={"tv"}>
            <i className="ri-tv-2-line mr-2"></i>
            </Link>
            <Link to={"people"}>
            <i className="ri-team-fill mr-2"></i>
            </Link>
        </div>
    )
}

export default Bottomnav