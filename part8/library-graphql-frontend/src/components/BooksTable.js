import React from 'react';
import BookTableRow from './BookTableRow';

const BooksTable = ({ books }) => {
    const displayBooks = () => {
        return [...books].map(book => <BookTableRow key={book.id} book={book} />);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                {displayBooks()}
            </tbody>
        </table>
    );
};

export default BooksTable;