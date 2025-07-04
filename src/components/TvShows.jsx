import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./partials/Loader"
import axios from "../utils/axios"
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import VerticalCards from "./partials/VerticalCards"

const TvShows = () => {
    const navigate=useNavigate()
    const [TvShows, setTvShows] = useState([])
    const [category, setcategory] = useState("airing_today")
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="RV | TvShows"

    const GetTvShows =  async()=>{
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length) {
                setTvShows((prevState)=>[...prevState, ...data.results])
                setpage(page+1)
            }else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const refershHandler = ()=>{
        if (TvShows.length === 0) {
            GetTvShows();
        }else{
            setpage(1)
            setTvShows([])
            GetTvShows()
        }
    }
    
    useEffect(()=>{
        refershHandler();
    },[category]);

    return TvShows.length > 0 ? (
    <div className="h-screen w-screen flex flex-col">

        <div className="w-full px-3 flex border-b-1 py-3 border-zinc-400 items-center justify-between text-white">
            <div className="flex gap-3 items-center">
                <i onClick={()=>navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i> 
                <h1> TvShows <span className="text-sm text-zinc-400">{category}</span></h1>
            </div>
            <div className="hidden md:block">
                <Topnav/>
            </div>
            <Dropdown title="Category" options={["on_the_air","top_rated","popular","airing_today"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <div className="md:hidden text-xl">
            <Topnav/>
        </div>

        <InfiniteScroll
            dataLength={TvShows.length}
            next={GetTvShows}
            hasMore={hasMore}
            loader={<h1>loading</h1>}
            >
            <VerticalCards data={TvShows} title={"tv"}/>
        </InfiniteScroll>

    </div>
    ) :(
        <Loader/>
    );
}

export default TvShows