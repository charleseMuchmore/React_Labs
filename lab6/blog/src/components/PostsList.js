import { useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';
import PostCard from './PostCard';
import './PostsList.css';

function PostsList() {
    const { user } = useContext(UserContext);
    const { featuredPosts, posts } = useContext(PostsContext);

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