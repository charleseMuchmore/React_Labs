import { useContext, useState } from 'react';
import UserContext from '../context/user';
import LoginForm from '../components/LoginForm';
import {Link, NavLink, useLocation} from 'react-router-dom';

function NavBar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const location = useLocation();

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
        <Link to="/">My Blogging App</Link>
        { (user && /^\/posts\/\d{1,}$/.test(location.pathname)) ?
            <NavLink 
                to={`/posts/edit/${location.state.id}`}
                state={location.state}>
                <h3>edit</h3>
            </NavLink>
             :
            ""
        }
        { (user && /^\/$/.test(location.pathname)) ?
            <NavLink to="posts/new">
            <h3>+</h3>
            </NavLink>
                : 
            ""
        }
        { (user) ?
            <NavLink 
            className="nav-link me-2"
            state={user} 
            to="/user">
                <div>\O/</div>
            </NavLink>  
                :
            ""
        }
        
        {!user && 
        <button onClick={handleClick}>login</button>
        }

        {user && 
        <button onClick={handleClick}>logout</button>
        }

        {showLogin === true &&
        <LoginForm onSubmit={handleLoginSubmit}/>
        }

    </div>
    )
}

export default NavBar;