import { useLocation } from 'react-router-dom';

function EditUserProfile() {
    const location = useLocation();
    return (<><h1>Welcome {location.state.name}!</h1></>)
}

export default EditUserProfile;