import axiosClient from "./axiosClient";

const commentApi = {
    newComment: (params) => {
        const url = "/comment";
        return axiosClient.post(url, params);
    },
    getCommentByPost: (postId) => {
        const url = `/comment/${postId}`
        return axiosClient.get(url);
    }
};

export default commentApi;
