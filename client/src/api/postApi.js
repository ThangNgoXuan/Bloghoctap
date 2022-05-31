import axiosClient from "./axiosClient";

const postApi = {
    getPosts: () => {
        const url = "/post";
        return axiosClient.get(url);
    },
    samePostOfAuthor: (author, size = 5) => {
        const url = `/post/author/${author}/${size}`;
        return axiosClient.get(url);
    },
    likePost: (postId, userId) => {
        const url = `/post/like/${postId}/${userId}`;
        return axiosClient.get(url);
    },
    getPostsBySlug: (slug) => {
        const url = `/post/${slug}`;
        return axiosClient.get(url);
    },
    getPostsByTag: (tag) => {
        const url = "/post/tags-posts-popular";
        return axiosClient.get(url);
    },
    getTagsOfUser: () => {
        const url = "/post/tag";
        return axiosClient.get(url);
    },
    countComment: () => {
        const url = "/comment/count";
        return axiosClient.get(url);
    },
    myPost: () => {
        const url = "/post/mypost";
        return axiosClient.get(url);
    }
};

export default postApi;
