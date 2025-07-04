import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./partials/Loader"
import axios from "../utils/axios"
import Topnav from "./partials/Topnav"
import InfiniteScroll from "react-infinite-scroll-component"
import VerticalCards from "./partials/VerticalCards"
import Dropdown from "./partials/Dropdown"

const Movies = () => {
    const navigate=useNavigate()
    const [Movies, setMovies] = useState([])
    const [category, setcategory] = useState("now_playing")
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="RV | Movies"

    const GetMovies =  async()=>{
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length) {
                setMovies((prevState)=>[...prevState, ...data.results])
                setpage(page+1)
            }else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const refershHandler = ()=>{
        if (Movies.length === 0) {
            GetMovies();
        }else{
            setpage(1)
            setMovies([])
            GetMovies()
        }
    }
    
    useEffect(()=>{
        refershHandler();
    },[category]);

    return Movies.length > 0 ? (
    <div className="h-screen w-screen flex flex-col">

        <div className="w-full px-3 flex border-b-1 py-3 border-zinc-400 items-center justify-between text-white">
            <div className="flex gap-3 items-center">
                <i onClick={()=>navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i> 
                <h1> Movies <span className="text-sm text-zinc-400">{category}</span></h1>
            </div>
            <div className="hidden md:block">
                <Topnav/>
            </div>
            <Dropdown title="Category" options={["now_playing","top_rated","popular","upcoming"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <div className="md:hidden text-xl">
            <Topnav/>
        </div>

        <InfiniteScroll
            dataLength={Movies.length}
            next={GetMovies}
            hasMore={hasMore}
            loader={<h1>loading</h1>}
            >
            <VerticalCards data={Movies} title={"movie"}/>
        </InfiniteScroll>

    </div>
    ) :(
        <Loader/>
    );
}

export default Movies