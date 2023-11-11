import { useContext, useState } from 'react';
import UserContext from '../context/user';
import LoginForm from '../components/LoginForm';

function NavBar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);

    const handleClick = () => {
        if (showLogin === false && user === false) {
            setShowLogin(true);
        } else if (showLogin === true) {
            setShowLogin(false);
        } else {
            resetUser();
        }
    };

    const handleLoginSubmit = () => {
        setShowLogin(false);
    }

    return (
    <div>
        <div href="../pages/Home.js">Logo</div>
        {user && 
        <button onClick={handleClick}>login</button>}
        {user && user.id &&
        <div>
            <a href="#">add post</a>
            <a href="#">update profile</a>
            <button onClick={handleClick}>logout</button>
        </div>}
        {showLogin === true &&
        <LoginForm onSubmit={handleLoginSubmit}/>}
    </div>
    )
}

export default NavBar;