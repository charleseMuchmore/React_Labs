import { useEffect, useContext } from 'react';
import PostsContext from './context/posts';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {
    const { fetchFeaturedPosts } = useContext(PostsContext);
    const { fetchCategories } = useContext(PostsContext);

    useEffect(() => {
        fetchFeaturedPosts();
        fetchCategories();
    }, [fetchFeaturedPosts, fetchCategories]); //this may just need to be an empty arry, not sure

    return (
        <Routes>
            <Route path="/" element={<Layout />} />
                <Route index element={<Home />} />
                <Route path="user" element={
                    (user) ? <EditUserProfile /> : <Navigate replace to={'/'} />
                } />
                <Route path="posts/id" element={<Post />} />
                <Route path="posts/new" element={
                    (user) ? <EditPost /> : <Navigate replace to={'/'} />
                } />
                <Route path="posts/edit/id" element={
                    (user && location && location.state && user.id === location.state) ?
                    <EditPost /> : <Navigate replace to={'/'} />
                } />
                <Route path="*" element={<Error />} />
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