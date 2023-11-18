import { useLocation } from 'react-router-dom';

function EditPost() {
    const location = useLocation();

    return (
        <>
        {location.state === null && location.pathname === "/posts/new" && 
        <h1>Add Post</h1>}
        {location.state !== null && 
        <h1>Edit Post</h1>}
        </>
    )
}

export default EditPost;