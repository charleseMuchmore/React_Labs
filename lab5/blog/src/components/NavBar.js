import { useContext, useState } from 'react';
import UserContext from '../context/user';
import LoginForm from '../components/LoginForm';
import './NavBar.css';

function NavBar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);

    const handleClick = () => {
        if (showLogin === false && !user) {
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
        <div href="../pages/Home.js" className="border">\O/</div>
        
        {!user && 
        <button onClick={handleClick}>login</button>
        }

        {user && 
        <div className="border"> 
            <a href="#">add post</a>
            <a href="#">update profile</a>
            <button onClick={handleClick}>logout</button>
        </div>
        }

        {showLogin === true &&
        <LoginForm onSubmit={handleLoginSubmit}/>
        }

    </div>
    )
}

export default NavBar;