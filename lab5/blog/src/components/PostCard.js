import './PostCard.css';

function PostCard({ aKey, title, content}) {
    return <div key={aKey} className="border">{title}This is a post {content}</div>
}

export default PostCard;