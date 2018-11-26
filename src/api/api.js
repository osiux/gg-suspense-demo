import wretch from "wretch";
import { unstable_createResource } from "react-cache";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

const headers = {
    "Content-Type": "application/json",
};

const apiResource = unstable_createResource(
    async (query = {}) => {
        const api = wretch()
            .url(BASE_URL)
            .query({
                api_key: API_KEY,
                format: "json",
                ...query,
            })
            .headers(headers);

        return await api.get().json();
    },
    value => {
        return JSON.stringify(value);
    },
);

const getTopArtists = () =>
    apiResource.read({ method: "chart.gettopartists", limit: 16 });

const getArtistInfo = artistId =>
    apiResource.read({ method: "artist.getinfo", mbid: artistId });

const getArtistAlbums = artistId =>
    apiResource.read({
        method: "artist.gettopalbums",
        mbid: artistId,
        limit: 16,
    });

export { getTopArtists, getArtistInfo, getArtistAlbums };
