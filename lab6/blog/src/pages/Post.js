import { useLocation } from 'react-router-dom';
import PostHeader from '../components/PostHeader';
import parse from 'html-react-parser';

function Post() {
    const location = useLocation();
    return (
        <>
        <PostHeader post={location.state}/>
        <div>
        {parse(location.state.content)}
        </div>
        </>)
}

export default Post;