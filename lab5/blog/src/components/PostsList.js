import { useContext, useState } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';

function PostsList() {
    const { user } = useContext(UserContext);
    const { posts, featuredPosts } = useContext(PostsContext);
    
    let postsToRender = 0;
    if (user) {
        postsToRender = featuredPosts;
    } else {
        postsToRender = posts;
    }

    console.log(postsToRender);

    return <div>PostsList</div>
}

export default PostsList;