import { useLocation } from 'react-router-dom';

function Post() {
    const location = useLocation();
    return (
        <>
        <h1>A post page</h1>
        <h2>This is the id: {location.state.id}</h2>
        </>
    )
}

export default Post;