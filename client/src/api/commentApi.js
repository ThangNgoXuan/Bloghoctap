import axiosClient from "./axiosClient";

const commentApi = {
    newComment: (params) => {
        const url = "/comment";
        return axiosClient.post(url, params);
    },
};

export default commentApi;
