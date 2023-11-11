import { useState, useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';

function LoginForm({ onSubmit }) {
    const [userid, setUserid] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { fetchUser } = useContext(UserContext);
    const { fetchPosts } = useContext(PostsContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let fetchedUser = await fetchUser(userid, password);
        if (fetchedUser === null) {
            setError(true);
        } else {
            fetchPosts(userid)
            setUserid("");
            setPassword("");
            onSubmit();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {error === true &&
                    <div>There's been an error...</div>}
                </div>
                <input 
                id="userid" 
                type="text" 
                value={userid} 
                onChange={(event)=> {
                    setUserid(event.target.value);
                    }
                } 
                placeholder="user id" />
                <input 
                type="text" 
                value={password} 
                onChange={(event)=> {
                    setPassword(event.target.value);
                    }
                } 
                placeholder="password" />
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default LoginForm;