import axios from "axios";

const request = axios.create({
    withCredentials: true,
}); 

export const BASE_API = process.env.REACT_APP_BASE;

export const SEARCH_API = `${BASE_API}/search`;
export const DETAILS_API = `${BASE_API}/product`;

// search endpoint
export const search = async (pageIndex, queryString) => {
    const response = await request.get(`${SEARCH_API}/${pageIndex}${queryString}`);
    return response.data;
};

// product details endpoint
export const details = async (productID) => {
    const response = await request.get(`${DETAILS_API}/${productID}`);
    return response.data;
};

// register endpoint
export const register = async (user) => {
    const status = await request.post(`${BASE_API}/signup`, user)
    return status
}

// login endpoint
export const login = async (creds) => {
    const status = await request.post(`${BASE_API}/signin`, creds)
    return status
}

// account endpoint
export const account = async () => {
    const response = await request.get(`${BASE_API}/account`)
    console.log('response', response, response.data)
    return response.data
}