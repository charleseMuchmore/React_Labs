import './PostCard.css';
import parse from 'html-react-parser';
import { useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';

function PostCard({ post }) {
    const { deletePostById } = useContext(PostsContext);
    const { user } = useContext(UserContext);

    const handleDeleteClick = () => {
        deletePostById(post.id);
    };

    let date = new Date(post.datetime);

    return (
        <div className="card resize-card">
            <img className="card-img-top" src={`data:image/png;base64,${post.image}`}></img>
            <div className="card-title">
                {post.title} 
            </div>
            <div className="card-subtitle">
                {post.category}
            </div>
            <div className="card-body">
                {parse(post.content.substring(0, 100))}
                {user && <button onClick={handleDeleteClick}>Delete</button> && 
                <a href="#">Edit</a>}
                <a href="#">view more</a>
            </div>
        </div>
    )
}

export default PostCard;