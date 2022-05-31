import axiosClient from "./axiosClient";

const userApi = {
    getUserById: (userId) => {
        const url = `/user/:${userId}`;
        return axiosClient.get(url);
    },
    login: (email, password) => {
        const url = "/user/login";
        return axiosClient.post(url, { email, password });
    },
    signup: (name, email, password) => {
        const url = "/user";
        return axiosClient.post(url, { name, email, password });
    },
    getUserProfile: () => {
        const url = "/user/profile";
        return axiosClient.get(url);
    },
    listFollowing: (userId) => {
        const url = `/user/follow/${userId}`;
        return axiosClient.get(url);
    },
    following: (authorId) => {
        const url = `/user/following/${authorId}`;
        return axiosClient.get(url);
    }
};

export default userApi;
