import axios from "axios";

const request = axios.create({
    withCredentials: true,
}); 

export const BASE_API = process.env.REACT_APP_BASE;

export const SEARCH_API = `${BASE_API}/search`;
export const DETAILS_API = `${BASE_API}/product`;
export const USERS_API = `${BASE_API}/users`;
export const REVIEWS_API = `${BASE_API}/reviews`;
export const DISCUSSION_API = `${BASE_API}/discussion`;
export const INFLUENCERS_API = `${BASE_API}/influencers`;
export const REPLY_API = `${BASE_API}/replies`;



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

// get given user's public profile
export const getPublicUserProfile = async (username) => {
    try {
        const response = await request.get(`${USERS_API}/public/${username}`)
        return {status: response.status, data: response.data}
    } catch (err) {
        return { status: 400 }
    }
}

// update user's profile endpoint
export const updateUser = async (account) => {
    const response = await request.put(`${USERS_API}/${account.username}`, account)
    return response.data
}

// gets all the reviews for the given product
export const getProductReviews = async (productID) => {
    const response = await request.get(`${REVIEWS_API}/product/${productID}`)
    return response.data
}

// creates a review
export const createReview = async (review) => {
    const status = await request.post(`${REVIEWS_API}`, review)
    return status
}

// deletes a review
export const deleteReview = async (reviewID) => {
    const status = await request.delete(`${REVIEWS_API}/${reviewID}`)
    return status
}

// updates a review
export const updateReview = async (reviewID, review) => {
    const response = await request.put(`${REVIEWS_API}/${reviewID}`, review)
    return response.data
}

// gets all the reviews for the given user
export const getUserReviews = async (username) => {
    const response = await request.get(`${REVIEWS_API}/${username}`)
    return response.data
}

// gets all influencers in the database
export const getAllInfluencers = async () => {
    const response = await request.get(`${INFLUENCERS_API}`)
    return response.data
}

// follows the given influencer
export const followInfluencer = async (influencerUsername) => {
    const status = await request.post(`${BASE_API}/follow/${influencerUsername}`)
    return status
}

// unfollows the given influencer
export const unfollowInfluencer = async (influencerUsername) => {
    const status = await request.post(`${BASE_API}/unfollow/${influencerUsername}`)
    return status
}

// gets the people the given user is following
export const getFollowing = async (username) => {
    try {
        const response = await request.get(`${BASE_API}/following/${username}`)
        return {status: response.status, data: response.data}
    } catch (err) {
        console.log(err)
        return {status: 400}
    }
}

// gets the people that follow the given user 
export const getFollowers = async (username) => {
    try {
        const response = await request.get(`${BASE_API}/followers/${username}`)
        return {status: response.status, data: response.data}
    } catch (err) {
        console.log(err)
        return {status: 400}
    }
}

//creates a new discussion post
export const writePost = async (username, post) => {
    const status = await request.post(`${DISCUSSION_API}/new/${username}`, post);
    return status
}

//gets all discussion posts
export const getPosts = async () => {
    const status = await request.get(`${DISCUSSION_API}`);
    return status;
}

//updates discussion post
export const updatePost = async (id, post) => {
    const status = await request.put(`${DISCUSSION_API}/${id}`, post);
    return status;  
}

export const deletePost = async (id) => {
    const status = await request.delete(`${DISCUSSION_API}/${id}`);
    return status;
}

export const writeReply = async (id, review) => {
    const status = await request.post(`${REPLY_API}/${id}`, review);
    return status;
}

export const getReplies = async (did) => {
    const status = await request.get(`${REPLY_API}/${did}`);
    return status;
}

export const deleteReply = async (id) => {
    const status = await request.delete(`${REPLY_API}/${id}`);
    return status;
}