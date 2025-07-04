import { Link } from "react-router-dom"

const Sidenav = () => {
  return (
    <div className="w-[15%] h-full hidden md:block border-r-2 border-zinc-400 p-5">
        <h1 className="text-2xl">
            <i className="ri-tv-fill text-[#C1121F] mr-2"></i>
            <span className="text-[#FDF0D5] font-bold">RV</span>
        </h1>

        <nav className="flex flex-col text-[#FDF0D5] gap-3">
            <h1 className=" font-semibold mt-5 mb-2">New Feeds</h1>
            <Link to={"trending"} className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-fire-fill"></i> Trending
            </Link>
            <Link to={"popular"} className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-bard-fill mr-2"></i>Popular
            </Link>
            <Link to={"movies"} className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-movie-2-line mr-2"></i>Movies
            </Link>
            <Link to={"tv"} className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-tv-2-line mr-2"></i>TV Shows
            </Link>
            <Link to={"people"} className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-team-fill mr-2"></i>Peoples
            </Link>
        </nav>
        <hr className="border-white mt-2" />
        <nav className="flex flex-col text-[#FDF0D5] gap-3">
            <h1 className=" font-semibold mt-5 mb-2">Website Info</h1>
            <Link className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-information-2-line mr-2"></i>About
            </Link>
            <Link className="hover:bg-[#C1121F] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-mail-line mr-2"></i>Contact Us
            </Link>
        </nav>
    </div>
  )
}

export default Sidenav