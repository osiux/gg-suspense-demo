import wretch from "wretch";

const API_KEY = "";
const BASE_URL = "https://api-endpoint.igdb.com/";

const appendHeaders = () => {
    return next => url => {
        const options = {
            headers: {
                "user-key": API_KEY,
                accept: "application/json",
            },
        };

        return next(url, options);
    };
};

const api = wretch()
    .middlewares([appendHeaders()])
    .url(BASE_URL);

export default api;
