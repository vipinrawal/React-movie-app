export { removetv } from '../reducers/tvSlice';
import axios from '../../utils/axios';
import { loadtv } from '../reducers/tvSlice';

export const asyncloadtv = (id, seasonnumber ) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        const images = await axios.get(`/tv/${id}/images`);
        const credits = await axios.get(`/tv/${id}/credits`);
        const reviews = await axios.get(`/tv/${id}/reviews`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m)=>m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            images: images.data.backdrops.slice(0,10),
            credits: credits.data.cast.slice(0,10),
            reviews: reviews.data.results
        };

        dispatch(loadtv(theultimatedetails));

    } catch (error) {
        console.log(error);
        
    }
}

