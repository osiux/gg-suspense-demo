import { unstable_createResource } from "react-cache";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1";

const headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
};

const apiResource = unstable_createResource(async path => {
    const response = await fetch(path, { headers });

    return await response.json();
});

const getCategories = () => apiResource.read(`${BASE_URL}/categories`);

const getImagesByCategory = categoryId =>
    apiResource.read(
        `${BASE_URL}/images/search?category_ids=${categoryId}&limit=12`,
    );

export { getCategories, getImagesByCategory };
