import { useState, useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';

function LoginForm({ onSubmit }) {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { fetchUser } = useContext(UserContext);
    const { fetchPosts } = useContext(PostsContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let fetchedUser = await fetchUser(userid, password);

        if (fetchedUser === undefined || fetchedUser === null) {
            setError(true);
        } 
        else {
            fetchPosts(fetchedUser.id);
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
                <div>
                    <input 
                    id="userid" 
                    value={userid} 
                    onChange={(event)=> {
                        setUserid(event.target.value);
                        }
                    } />
                </div>
                <div>
                <input 
                    value={password} 
                    onChange={(event)=> {
                        setPassword(event.target.value);
                        }
                    } />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;