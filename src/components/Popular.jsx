import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./partials/Loader"
import axios from "../utils/axios"
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import VerticalCards from "./partials/VerticalCards"

const Popular = () => {
    const navigate=useNavigate()
    const [Popular, setPopular] = useState([])
    const [category, setcategory] = useState("movie")
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="RV | Popular"

    const GetPopular =  async()=>{
        try {
            const { data } = await axios.get(`/${category}/popular?page=${page}`);
            if (data.results.length) {
                setPopular((prevState)=>[...prevState, ...data.results])
                setpage(page+1)
            }else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const refershHandler = ()=>{
        if (Popular.length === 0) {
            GetPopular();
        }else{
            setpage(1)
            setPopular([])
            GetPopular()
        }
    }
    
    useEffect(()=>{
        refershHandler();
    },[category]);

    return Popular.length > 0 ? (
    <div className="h-screen w-screen flex flex-col">

        <div className="w-full px-3 flex border-b-1 py-3 border-zinc-400 items-center justify-between text-white">
            <div className="flex gap-3 items-center">
                <i onClick={()=>navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i> 
                <h1 className="text-xm"> Popular {category}</h1>
            </div>
            <div className="hidden md:block">
                <Topnav/>
            </div>
            <div className="flex">
                <Dropdown title="Category" options={["movie","tv"]} func={(e) => setcategory(e.target.value)} />
            </div>
        </div>
        <div className="md:hidden text-xl">
            <Topnav/>
        </div>

        <InfiniteScroll
            dataLength={Popular.length}
            next={GetPopular}
            hasMore={hasMore}
            loader={<h1>loading</h1>}
            >
            <VerticalCards data={Popular} title={category}/>
        </InfiniteScroll>

    </div>
    ) :(
        <Loader/>
    );
}

export default Popular