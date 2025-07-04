import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "./partials/Loader"
import axios from "../utils/axios"
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import VerticalCards from "./partials/VerticalCards"

const Peoples = () => {
    const navigate=useNavigate()
    const [Peoples, setPeoples] = useState([])
    const [category, setcategory] = useState("popular")
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="RV | Peoples"

    const GetPeoples =  async()=>{
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results.length) {
                setPeoples((prevState)=>[...prevState, ...data.results])
                setpage(page+1)
            }else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const refershHandler = ()=>{
        if (Peoples.length === 0) {
            GetPeoples();
        }else{
            setpage(1)
            setPeoples([])
            GetPeoples()
        }
    }
    
    useEffect(()=>{
        refershHandler();
    },[category]);

    return Peoples.length > 0 ? (
    <div className="h-screen w-screen flex flex-col">

        <div className="w-full px-3 flex border-b-1 py-3 border-zinc-400 items-center justify-between text-white">
            <div className="flex gap-3 items-center">
                <i onClick={()=>navigate(-1)} className="hover:text-[#CA1823] text-2xl ri-arrow-left-line"></i> 
                <h1>People</h1>
            </div>
            <div className="hidden md:block">
                <Topnav/>
            </div>
        </div>
        <div className="md:hidden text-xl">
            <Topnav/>
        </div>

        <InfiniteScroll
            dataLength={Peoples.length}
            next={GetPeoples}
            hasMore={hasMore}
            loader={<h1>loading</h1>}
            >
            <VerticalCards data={Peoples} title={"people"}/>
        </InfiniteScroll>

    </div>
    ) :(
        <Loader/>
    );
}
export default Peoples