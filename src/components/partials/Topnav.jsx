import axios from "../../utils/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([])

  const GetSearches = async()=>{
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    GetSearches();
  },[query]);

  return (
    <div className='w-full h-[7vh] flex justify-center relative items-center'>
        <i className="text-zinc-400 text-xl ri-search-line"></i>
        <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-8 outline-none border-none p-2" 
        type="text" 
        placeholder="Search Anything"
        />

        {query.length > 0 && (
          <i 
          onClick={() => setquery("")}
          className="text-zinc-400 text-2xl hover:text-[#C1121F] ri-close-line"
          ></i>
        )}

        <div className="z-[100] absolute w-screen md:w-[50vw] max-h-[50vh]   bg-zinc-200 top-[100%] overflow-auto rounded">
          {searches.map((s, i)=>(
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 w-full p-8 flex justify-start items-center border-b-2 border-zinc-100 duration-200">
            <img 
            className="w-[12vh] h-[15vh] rounded mr-5 object-cover shadow-lg"
            src={`https://image.tmdb.org/t/p/original/${s.poster_path || s.backdrop_path || s.profile_path}`} 
            alt="" 
            />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default Topnav