import axios from "axios";

const request = axios.create({
    withCredentials: true,
}); 

export const BASE_API = process.env.REACT_APP_BASE;

export const SEARCH_API = `${BASE_API}/search`;
export const DETAILS_API = `${BASE_API}/product`;
export const USERS_API = `${BASE_API}/users`;

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
    try {
        const response = await request.post(`${BASE_API}/signup`, user)
        return {status: response.status, data: response.data}
    } catch (err) {
        return {status: 400}
    }
}

// login endpoint
export const login = async (creds) => {
    try {
        const response = await request.post(`${BASE_API}/signin`, creds)
        return {status: response.status, data: response.data}
    } catch (err) {
        return {status: 404}
    }
}

// logout endpoint
export const logout = async () => {
    const status = await request.post(`${BASE_API}/signout`)
    return status
}

// account endpoint
export const account = async () => {
    const response = await request.get(`${USERS_API}/account`)
    return response.data
}

// update user's profile endpoint
export const updateUser = async (account) => {
    const response = await request.put(`${USERS_API}/${account.username}`, account)
    return response.data
}