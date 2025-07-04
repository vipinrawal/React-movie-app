import { useEffect, useState } from "react";
import Header from "./partials/Header";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loader from "./partials/Loader";
import Bottomnav from "./partials/Bottomnav";

const Home = () => {
  document.title="RV | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [Trending, setTrending] = useState(null)
  const [category, setcategory] = useState("all")

  const GetHeaderWallpaper =  async()=>{
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
      setwallpaper(randomdata)
    } catch (error) {
      console.log(error)
    }
  };

  const GetTrending =  async()=>{
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results)
    } catch (error) {
      console.log(error)
    }
  };

  
  useEffect(()=>{
    GetTrending()
    !wallpaper && GetHeaderWallpaper()
  },[category]);
  
  return wallpaper ? (
    <>
      <Sidenav/>
      <div className="w-[100%] md:w-[85%] relative h-full overflow-y-auto pb-10 overflow-hidden">
        <Topnav/>
        <Header data={wallpaper}/>
        <div className="w-full px-4 mt-2 flex justify-between">
          <h1 className="text-xl font-semibold text-[#FDF0D5]">Trending</h1>
          <Dropdown title={"Filter"} options={['tv','movie','all']} func={(e) => setcategory(e.target.value)}/>
        </div>
        <HorizontalCards data={Trending}/>
      <Bottomnav/>
      </div>
    </>
  ):(
    <Loader/>
  );
}

export default Home