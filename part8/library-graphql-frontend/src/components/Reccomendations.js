import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import BooksTable from './BooksTable';

const CURRENT_USER = gql`{
  me {
    username
    favoriteGenre
    id
  }
}`;

const RECCOMENDED_BOOKS = gql`query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      id
      author {
        name
        id
        born
      }
    }
  }`;

const Reccomendations = (props) => {
  const client = useApolloClient();
  const currentUser = useQuery(CURRENT_USER).data;
  const [reccomendations, setReccomendations] = useState([]);

  if (!props.show || !currentUser || !currentUser.me) {
    return null;
  }

  const getFavoriteGenre = () => currentUser.me.favoriteGenre;

  const queryBooks = async () => {
    const { data } = await client.query({
      query: RECCOMENDED_BOOKS,
      variables: { genre: getFavoriteGenre() }
    });
    setReccomendations(data.allBooks);
  }
  queryBooks();

  return (
    <>
      <h2>Reccomentations</h2>
      <p>Books in your favorite genre: <b>{getFavoriteGenre()}</b></p>
      <BooksTable books={reccomendations}></BooksTable>
    </>
  );
};

export default Reccomendations


