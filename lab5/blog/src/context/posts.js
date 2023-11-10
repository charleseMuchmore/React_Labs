import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostsContext = createContext();

function Provider({ children }) {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    //featuredPosts function http://localhost:5000/posts?expand=user&sort=datetime&order=desc&start=0&end=12
    const fetchFeaturedPosts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?expand=user&sort=datetime&order=desc&start=0&end=12`);

        setFeaturedPosts(response.data);
    };

    //categories function
    const fetchCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories?sort=name&order=desc`);

        setCategories(response.data);
    };

    //posts functions
    const fetchPosts = async (userId) => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?userId=${userId}&expand=user&sort=datetime&order=desc`);

        setPosts(response.data);
    };

    // const deletePostById = async (postId) => {
    //     // const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}`);
    //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}`);

    //     // console.log("Delete request response: " + response.data);

    //     //updating posts state variable
    //     //NOTE: the parameter for this method may need to be updated to come
    //     //from somewhere else, not sure yet
    //     // console.log("UID: " + userId);
    //     // fetchPosts(userId);
    // };

    // const deletePostById = async (id) => {
    //     let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?id=${id}`);
    //     console.log(response);
    //     axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts?id=${id}`);

    //     fetchPosts();

    //     console.log(posts);
    // };

    const deletePostById = async (id) => { 
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`); 
        const updatedPosts = posts.filter((post) => { 
            return post.id !== id; }); 
            setPosts(updatedPosts); 
        };





    // const editPostById = async (postId, props) => {
    //     console.log("props: ");
    //     console.log(props);
    //     console.log(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}`);
    //     const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}`, props);
        
    //     const updatedPosts = [
    //         ...posts,
    //         response.data
    //     ];
    //     setPosts(updatedPosts);
    //     };

    const editPostById = async (id, props) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, {
            title: props.title,
            userId: props.id, 
            datetime: props.datetime, 
            category: props.category, 
            content: props.content
        });

        // const updatedPosts = posts.map((post) => {
        //     if (post.id === id) {
        //         return {...post, ...response.data };
        //     }

        //     return post;
        // });

        // setPosts(updatedPosts);
        const updatedPosts = [
            ...posts,
            response.data
        ];
        setPosts(updatedPosts);
    };





    const createPost= async (postProps) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts?`, postProps);
        
        const updatedPosts = [
            ...posts,
            response.data
        ];
        setPosts(updatedPosts);
    };

    const valueToShare = {
        featuredPosts,
        categories,
        posts,
        fetchFeaturedPosts,
        fetchCategories, 
        fetchPosts,
        deletePostById,
        editPostById,
        createPost
    };

   
    return <PostsContext.Provider value={valueToShare}>
        {children}
    </PostsContext.Provider>
}

export { Provider };
export default PostsContext;