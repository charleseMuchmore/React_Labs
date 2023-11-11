import { useContext, useState } from 'react';
import UserContext from '../context/user';
import LoginForm from '../components/LoginForm';
import './NavBar.css';

function NavBar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);

    const handleClick = () => {
        console.log("click");
        console.log(showLogin);
        if (showLogin === false && user) {
            console.log("1");
            setShowLogin(true);
        } else if (showLogin === true) {
            console.log("2");
            setShowLogin(false);
        } else {
            console.log("3");
            resetUser();
        }
    };

    const handleLoginSubmit = () => {
        setShowLogin(false);
    }

    return (
    <div>
        <div href="../pages/Home.js" className="border">\O/</div>

        {user && 
        <button onClick={handleClick}>login</button>
        }

        {user && user.id &&
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