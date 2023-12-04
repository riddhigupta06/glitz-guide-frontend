import axios from "axios";

const request = axios.create({
    withCredentials: true,
}); 

export const BASE_API = process.env.REACT_APP_BASE;

export const SEARCH_API = `${BASE_API}/search`;
export const DETAILS_API = `${BASE_API}/product`;

// search endpoint
export const search = async (pageIndex, queryString) => {
    const response = await request.get( `${SEARCH_API}/${pageIndex}${queryString}`);
    return response.data;
};

// product details endpoint
export const details = async (productID) => {
    const response = await request.get( `${DETAILS_API}/${productID}`);
    return response.data;
};