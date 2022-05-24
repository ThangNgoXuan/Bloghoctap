import axiosClient from "./axiosClient";

const postApi = {
    samePostOfAuthor: (author, size = 5) => {
        const url = `/post/author/${author}/${size}`;
        return axiosClient.get(url);
    },
    likePost: (postId, userId) => {
        const url = `/post/like/${postId}/${userId}`;
        return axiosClient.get(url);
    },
};

export default postApi;
