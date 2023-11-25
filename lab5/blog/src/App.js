import { useEffect, useContext } from 'react';
import PostsContext from './context/posts';
import UserContext from './context/user';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import EditPost from './pages/EditPost';
import NoPage from './pages/NoPage';
import Post from './pages/Post';
import Layout from './pages/Layout';
import EditUserProfile from './pages/EditUserProfile';

function App() {
    const { fetchFeaturedPosts } = useContext(PostsContext);
    const { fetchCategories } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        fetchFeaturedPosts();
        fetchCategories();
    }, []); //this may just need to be an empty arry, not sure

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="user" element={
                    (user) ? <EditUserProfile /> : <Navigate replace to={'/'} />
                } />
                <Route path="posts/:id" element={<Post />} />
                <Route path="posts/new" element={
                    (user) ? <EditPost /> : <Navigate replace to={'/'} />
                } />
                <Route path="posts/edit/:id" element={
                    (user && location && location.state && user.id === location.state.userId) ?
                    <EditPost /> : <Navigate replace to={'/'} />
                } />
                <Route path="*" element={<NoPage />} />
            </Route>             
        </Routes>
    )
    // return (
    // <div className="app">
    //     <NavBar />
    //     <Home />
    // </div>
    // )
}

export default App;