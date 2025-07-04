export { removeseason } from '../reducers/seasonSlice';
import axios from '../../utils/axios';
import { loadseason } from '../reducers/seasonSlice';

export const asyncloadseason = ( id, seasonnumber, episode ) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/tv/${id}/season/${seasonnumber}`);
        const credits = await axios.get(`/tv/${id}/season/${seasonnumber}/aggregate_credits`);
        const videos = await axios.get(`/tv/${id}/season/${seasonnumber}/videos`);
    

        let theultimatedetails = {
            detail: detail.data,
            credits: credits.data.cast.slice(0,10),
            images: detail.data.episodes.slice(0,20),
            videos: videos.data.results.find((m)=>m.type === "Trailer"),
        };

        dispatch(loadseason(theultimatedetails));

    } catch (error) {
        console.log(error);
        
    }
}

