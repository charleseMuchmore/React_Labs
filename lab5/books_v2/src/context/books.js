import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        // const response = await axios.get('http://localhost:3002/books');
        // response = await axios.get(`${process.env.PROD_DATA_URL}`);
        const response = await axios.get(`http://citweb.lanecc.net:5031/books`);
        setBooks(response.data);
    }, [])


    const editBookById = async (id, newTitle) => {
        // const response = await axios.put(`http://localhost:3002/books/${id}`, {
        //     title: newTitle
        // });
        // const response = await axios.put(`${process.env.PROD_DATA_URL}/${id}`, {
        //     title: newTitle
        // });
        const response = await axios.put(`http://citweb.lanecc.net:5031/books/${id}`, {
            title: newTitle
        });

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, ...response.data };
            }

            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        // await axios.delete(`http://localhost:3002/books/${id}`);
        // await axios.delete(`${process.env.PROD_DATA_URL}/${id}`);
        await axios.delete(`http://citweb.lanecc.net:5031/books/${id}`);


        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        // const response = await axios.post('http://localhost:3002/books', {
        //     title
        // });
        // const response = await axios.post(`${process.env.PROD_DATA_URL}`, {
        //     title
        // });
        const response = await axios.post(`http://citweb.lanecc.net:5031/books`, {
            title
        });
        
        const updatedBooks = [
            ...books,
            response.data
        ];
        setBooks(updatedBooks);
    };

    const valueToShare = {
        books,
        deleteBookById, 
        editBookById,
        createBook,
        fetchBooks
    };

    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { Provider };
export default BooksContext;