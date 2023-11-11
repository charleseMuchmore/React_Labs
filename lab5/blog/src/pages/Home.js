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
        {user && 
            <heading>There is no user logged in... so Featured Posts</heading>
        }
        {user && user.id &&
        <heading>A user is logged in.. so My Posts</heading>
        }
        </div>
        <PostsList />
    </div>
    )
}

export default Home;