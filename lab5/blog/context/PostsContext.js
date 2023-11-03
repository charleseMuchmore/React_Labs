import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostsContext = createContext();

function Provider({ children }) {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    //featuredPosts function
    const fetchFeaturedPosts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?expand=user&sort=datetime&order=desc&start=0&end=12`);

        setFeaturedPosts(response);
    };

    //categories function
    const fetchCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories?sort=name&order=desc`);

        setCategories(response);
    };

    //posts functions
    const fetchPosts = async (userId) => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?userId=${userId}&expand=user&sort=datetime&order=desc`);

        setPosts(response);
    };

    const deletePostById = async (postId) => {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}`);

        console.log("Delete request response: " + response);

        //updating posts state variable
        //NOTE: the parameter for this method may need to be updated to come
        //from somewhere else, not sure yet
        fetchPosts(userId);
    };

    const editPostById = async (postProps, postAuthor) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/posts?id=${postId}&title=${postProps.title}&userId=${postProps.userId}&datetime=${postProps.datetime}&category=${postProps.category}&content=${postProps.content}&image=${postProps.image}`);

        console.log("Put request response: " + response);

        //updating posts state variable
        //NOTE: the parameter for this method may need to be updated to come
        //from somewhere else, not sure yet
        fetchPosts(postAuthor.id);
    };

    const createPost = async (postProps, author) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts?title=${postProps.title}&userId=${author.userid}&datetime=${postProps.datetime}&category=${postProps.category}&content=${postProps.content}&image=${postProps.image}`);

        console.log("Post request response: " + response);
        //updating posts state variable
        //NOTE: the parameter for this method may need to be updated to come
        //from somewhere else, not sure yet
        fetchPosts(author.userid);
    };

   
    return <PostsContext.Provider>
        {children}
    </PostsContext.Provider>
}

export { Provider };
export default PostsContext;