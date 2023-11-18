import { useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';
import PostCard from './PostCard';
import './PostsList.css';
import { useLocation } from 'react-router-dom';

function PostsList() {
    const { user } = useContext(UserContext);
    const { featuredPosts, posts } = useContext(PostsContext);
    const location = useLocation();

    let postsToRender = null;
    if (user) {
        postsToRender = posts;
    } else {
        postsToRender = featuredPosts;
    }

    const renderedPosts = postsToRender.map((post) => {
        return <PostCard key={post.id} post={post} />;
    })

    return (
    <div className="border">
        {renderedPosts}
    </div>)
}

export default PostsList;