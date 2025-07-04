import { useNavigate } from "react-router-dom"
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown"
import axios from "../utils/axios"
import { useEffect, useState } from "react"
import VerticalCards from "./partials/VerticalCards"
import Loader from "./partials/Loader"
import InfiniteScroll from "react-infinite-scroll-component"


const Trending = () => {
    const navigate=useNavigate()
    const [Trending, setTrending] = useState([])
    const [category, setcategory] = useState("all")
    const [duration, setduration] = useState("day")
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="RV | Trending"

    const GetTrending =  async()=>{
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if (data.results.length) {
                setTrending((prevState)=>[...prevState, ...data.results])
                setpage(page+1)
            }else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const refershHandler = ()=>{
        if (Trending.length === 0) {
            GetTrending();
        }else{
            setpage(1)
            setTrending([])
            GetTrending()
        }
    }
    
    useEffect(()=>{
        refershHandler();
    },[category, duration]);

    return Trending.length > 0 ? (
    <div className="h-screen w-screen flex flex-col">

        <div className="w-full px-3 flex border-b-1 py-3 border-zinc-400 items-center justify-between text-white">
            <div className="flex gap-3 items-center">
                <i onClick={()=>navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i> 
                <h1 className="text-xm"> Trending {category}</h1>
            </div>
            <div className="hidden md:block">
                <Topnav/>
            </div>
            <div className="flex">
                <Dropdown title="Duration" options={["week","day"]} func={(e) => setduration(e.target.value)} />
                <Dropdown title="Category" options={["movie","tv","all"]} func={(e) => setcategory(e.target.value)} />
            </div>
        </div>
        <div className="md:hidden text-xl">
            <Topnav/>
        </div>

        <InfiniteScroll
            dataLength={Trending.length}
            next={GetTrending}
            hasMore={hasMore}
            loader={<h1>loading</h1>}
            >
            <VerticalCards data={Trending}/>
        </InfiniteScroll>

    </div>
    ) :(
        <Loader/>
    );
} 

export default Trending