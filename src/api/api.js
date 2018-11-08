import wretch from "wretch";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1/";

const api = wretch()
    .headers({
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
    })
    .url(BASE_URL);

const getCategories = async () =>
    api
        .url("categories")
        .get()
        .json();
const getImagesByCategory = async categoryId =>
    api
        .url(`images/search?category_ids=${categoryId}&limit=12`)
        .get()
        .json();

export { getCategories, getImagesByCategory };
