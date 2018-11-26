import { unstable_createResource } from "react-cache";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

const headers = {
    "Content-Type": "application/json",
};

const apiResource = unstable_createResource(async path => {
    const url = `${BASE_URL}?api_key=${API_KEY}&format=json&${path}`;
    const response = await fetch(url, { headers });

    return await response.json();
});

const getTopArtists = () =>
    apiResource.read("method=chart.gettopartists&limit=16");

const getArtistInfo = artistId =>
    apiResource.read(`method=artist.getinfo&mbid=${artistId}`);

const getArtistAlbums = artistId =>
    apiResource.read(`method=artist.gettopalbums&mbid=${artistId}&limit=16`);

export { getTopArtists, getArtistInfo, getArtistAlbums };
