import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import Reccomendations from './components/Reccomendations';
import SetBirthYear from './components/SetBirthYear';
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const BOOK_DETAILS = gql`fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      id
      born
      bookCount
    }
  }`;

const AUTHOR_DETAILS = gql`fragment AuthorDetails on Author {
  name
  born
  bookCount
  id
}`;

const ALL_AUTHORS = gql`{
  allAuthors {
    ...AuthorDetails
    }
  }${AUTHOR_DETAILS}`;

const SET_BORN_YEAR = gql`mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo,
    ) {
      ...AuthorDetails
    }
  }${AUTHOR_DETAILS}`;

const ALL_BOOKS = gql`{
    allBooks  {
      ...BookDetails
    }
  }${BOOK_DETAILS}`;

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }${BOOK_DETAILS}`;

const LOGIN = gql`mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }`;

const BOOK_ADDED = gql`
  subscription {
    addedBook {
      ...BookDetails
    }
  }${BOOK_DETAILS}`;

const CURRENT_USER = gql`{
  me {
    username
    favoriteGenre
    id
  }
}`;

const RECCOMENDED_BOOKS = gql`query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}${BOOK_DETAILS}`;

const App = (props) => {
  const client = useApolloClient();
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  const currentUser = useQuery(CURRENT_USER);
  const [token, setToken] = useState(localStorage.getItem('user_token') ? localStorage.getItem('user_token') : null);
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useState(null);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.addedBook;
      const type = 'success';
      const message = `Book "${addedBook.title}" was added!`;
      notifyUser({ type, message });
      updateCacheWithBook(addedBook);
    }
  });

  const notifyUser = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 8000);
  };

  const handleError = (errorMessage) => {
    const type = 'error';
    const message = errorMessage;
    notifyUser({ type, message });
  };

  const [setBornYear] = useMutation(SET_BORN_YEAR, {
    onError: () => { handleError('author was not updated') },
    update: (store, response) => {
      const updatedAuthor = response.data.editAuthor;
      const type = 'success';
      const message = `Author "${updatedAuthor.name}" was updated!`;
      notifyUser({ type, message });
      updateCacheWithAuthor(updatedAuthor);
    }
  });

  const [addBook] = useMutation(ADD_BOOK, {
    onError: () => { handleError('book was not added') },
    refetchQueries: [{ query: ALL_BOOKS }]
  });

  const [login] = useMutation(LOGIN, {
    onError: () => { handleError('password or username incorrect') },
    refetchQueries: [{ query: CURRENT_USER }]
  });

  const setCurrentUserToken = (token) => {
    setToken(token);
    localStorage.setItem('user_token', token);
    setPage('authors');
  };

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const includedInSet = (set, object) => set.map(p => p.id).includes(object.id);

  const getFavoriteGenre = () => {
    return client.query({ query: CURRENT_USER })
      .then(result => result.data.me.favoriteGenre)
      .catch(error => { return undefined });
  };

  const updateCacheWithBook = (addedBook) => {
    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedInSet(booksInStore.allBooks, addedBook)) {
      booksInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: booksInStore
      });
    }
    updateCacheWithAuthor(addedBook.author);
    updateReccomendations(addedBook);
  };

  const updateCacheWithAuthor = (bookAuthor) => {
    let authorsInStore = client.readQuery({ query: ALL_AUTHORS });
    if (includedInSet(authorsInStore.allAuthors, bookAuthor)) {
      authorsInStore.allAuthors = [...authorsInStore.allAuthors].filter(author => author.id !== bookAuthor.id);
    }
    authorsInStore.allAuthors.push(bookAuthor);
    client.writeQuery({
      query: ALL_AUTHORS,
      data: authorsInStore
    });
  };

  const updateReccomendations = (addedBook) => {
    getFavoriteGenre().then(userFavoriteGenre => {
      if (userFavoriteGenre && addedBook.genres.includes(userFavoriteGenre)) {
        try {
          const reccomendations = client.readQuery({
            query: RECCOMENDED_BOOKS,
            variables: { genre: userFavoriteGenre },
          });
          if (userFavoriteGenre && !includedInSet(reccomendations.allBooks, addedBook)) {
            reccomendations.allBooks.push(addedBook);
            client.writeQuery({
              query: RECCOMENDED_BOOKS,
              variables: { genre: userFavoriteGenre },
              data: reccomendations
            });
          }
        } catch (error) {
        }
      }
    });
  };

  const userIsLoggedIn = () => {
    return (token !== null) ? true : false;
  };

  const displayAuthorUpdateForm = () => {
    return (userIsLoggedIn() && page === 'authors' && allAuthors.data && allAuthors.data.allAuthors && allAuthors.data.allAuthors.length) ? true : false;
  };

  const getAllBooks = () => {
    return (allBooks.data && allBooks.data.allBooks) ? allBooks.data.allBooks : [];
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {userIsLoggedIn() ? <button onClick={() => setPage('add')}>add book</button> : <button onClick={() => setPage('login')}>login</button>}
        {userIsLoggedIn() ? <button onClick={() => setPage('recommendations')}>recommendations</button> : null}
        {userIsLoggedIn() ? <button onClick={() => logout()}>logout</button> : null}
      </div>

      <Notification notification={notification} />

      <Authors show={page === 'authors'} token={token} result={allAuthors.data} />

      {displayAuthorUpdateForm() ? <SetBirthYear setBornYear={setBornYear} authors={allAuthors.data.allAuthors} /> : null}

      <Books show={page === 'books'} allBooks={getAllBooks()} />

      <Reccomendations show={page === 'recommendations'} />

      {!userIsLoggedIn() ? <LoginForm show={page === 'login'} login={login} setToken={(token) => setCurrentUserToken(token)} /> : null}

      {userIsLoggedIn() ? <NewBook show={page === 'add'} addBook={addBook} /> : null}
    </div>
  );
};

export default App;