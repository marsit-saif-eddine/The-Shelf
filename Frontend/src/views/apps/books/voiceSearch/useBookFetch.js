import { useEffect, useState } from 'react';
import axios from "axios";

const useBookFetch = () => {
    const [authorBooks, setAuthorBooks] = useState([]);
    const [isFetchingBooks, setIsFetchingBooks] = useState(false);
    const [fetchResponse, setFetchRespose] = useState('');

    

    const fetchBooksByAuthor = async authorName  => {
        setIsFetchingBooks(true);
         await axios.get(`http://localhost:5000/book/book_author`, { params: { author: authorName } })
        .then((res) => res.data)
        .then(res => {
            if(res.length) {
                setAuthorBooks(res.map(book => {
                    return {
                        name: book.name,
                        image: book.image,
                        _id: book._id,
                        author: book.author,
                        description: book.description,
                    }
                }))
            setIsFetchingBooks(false);
            setFetchRespose('Search results for: ')
            } 
            else {
                setFetchRespose('There is no results for: ') 
            }

        });
    }

    return {
        authorBooks,
        fetchBooksByAuthor,
        isFetchingBooks,
        fetchResponse
    };
};

export {
    useBookFetch,
}
