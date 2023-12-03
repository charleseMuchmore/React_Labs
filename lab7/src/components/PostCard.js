import './PostCard.css';
import parse from 'html-react-parser';
import { useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';
import { Link, useLocation } from 'react-router-dom';

function PostCard({ post }) {
    const { deletePostById } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const location = useLocation();

    const handleDeleteClick = () => {
        deletePostById(post.id);
    };

    return (
        <div className="card resize-card">
            <img className="card-img-top" src={`data:image/png;base64,${post.image}`} alt="card"></img>
            <div className="card-title">
                {post.title} 
            </div>
            <div className="card-subtitle">
                {post.category}
            </div>
            <div className="card-body">
                <div>
                    {parse(post.content.substring(0, 100))}
                    {user && /^\/$/.test(location.pathname) && 
                    <div><Link state={post} to={`posts/edit/${post.id}`}>Edit</Link>
                    <button onClick={handleDeleteClick}>Delete</button></div>}
                    
                    <Link state={post} to={`posts/${post.id}`}>More</Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard;