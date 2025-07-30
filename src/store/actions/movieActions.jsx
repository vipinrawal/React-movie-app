export { removemovie } from '../reducers/movieSlice';
import axios from '../../utils/axios';
import { loadmovie } from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        const images = await axios.get(`/movie/${id}/images`);
        const credits = await axios.get(`/movie/${id}/credits`);
        const reviews = await axios.get(`/movie/${id}/reviews`);

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

        dispatch(loadmovie(theultimatedetails));

    } catch (error) {
        console.log(error);
        
    }
}