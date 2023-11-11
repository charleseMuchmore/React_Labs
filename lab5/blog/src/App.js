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
    }, []);

    return (
    <div className="app">
        <NavBar />
        <Home />
    </div>
    )
}

export default App;