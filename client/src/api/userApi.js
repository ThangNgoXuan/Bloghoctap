import axiosClient from "./axiosClient";

const userApi = {
    getUserById: (userId) => {
        const url = `/user/:${userId}`;
        return axiosClient.get(url);
    },
};

export default userApi;
