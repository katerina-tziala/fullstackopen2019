import React from 'react';
import AuthorTableRow from './AuthorTableRow';

const Authors = (props) => {
  if (!props.show || !props.result) {
    return null;
  }

  const displayAllAuthors = () => props.result.allAuthors.map(author => <AuthorTableRow key={author.id} author={author} />);

  return (
    <>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {displayAllAuthors()}
        </tbody>
      </table>
    </>
  );
};

export default Authors;