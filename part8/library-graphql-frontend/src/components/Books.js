import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import Select from 'react-select';
import BooksTable from './BooksTable';

const FILTERED_BOOKS = gql`
  query allBooks($genre: String!) {
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
  }
`;

const defaultGenreOption = { value: 'all', label: 'All' };

const Books = (props) => {
  const client = useApolloClient(FILTERED_BOOKS);
  const allBooks = props.allBooks;
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedFilterOption, setFilterOption] = useState(defaultGenreOption);

  if (!props.show) {
    return null
  }

  const getFilterOptions = () => {
    let options = [defaultGenreOption];
    let genres = [];
    [...allBooks].map(book => genres = genres.concat(book.genres));
    genres = Array.from(new Set(genres));
    genres.sort().map(genre => options.push({ value: genre, label: genre }));
    return options;
  };

  const handleOptionChange = (option) => {
    setFilterOption(option);
    const newFilterValue = option.value;
    if (newFilterValue !== 'all') {
      queryBooks(newFilterValue);
    } else {
      setFilteredBooks([]);
    }
  };

  const queryBooks = async (selectedGenre) => {
    const { data } = await client.query({
      query: FILTERED_BOOKS,
      variables: { genre: selectedGenre }
    })
    setFilteredBooks(data.allBooks);
  }

  return (
    <>
      <h2>Books</h2>
      <div>
        Select Genre:
        <Select value={selectedFilterOption} onChange={handleOptionChange} options={getFilterOptions()} />
      </div>
      <BooksTable books={filteredBooks.length === 0 ? allBooks : filteredBooks } ></BooksTable>
    </>
  );
}

export default Books