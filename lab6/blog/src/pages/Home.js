import { useContext } from 'react';
import UserContext from '../context/user';
import Header from '../components/Header';
import PostsList from '../components/PostsList';

function Home() {
    const { user } = useContext(UserContext);

    return (
    <div className="home">
        <Header />
        <div>
        {!user && 
            <div>There is no user logged in... so Featured Posts</div>
        }
        {user && 
        <div>A user is in fact logged in.. so My Posts</div>
        }
        </div>
        <PostsList />
    </div>
    )
}

export default Home;