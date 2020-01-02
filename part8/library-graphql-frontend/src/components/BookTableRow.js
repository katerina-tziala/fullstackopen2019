import React from 'react';

const BookTableRow = ({ book }) => {
    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
        </tr>
    );
};

export default BookTableRow;