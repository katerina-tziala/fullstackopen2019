import React from 'react';

const AuthorTableRow = ({ author }) => {
    return (
        <tr>
            <td>{author.name}</td>
            <td>{author.born}</td>
            <td>{author.bookCount}</td>
        </tr>
    );
};

export default AuthorTableRow;