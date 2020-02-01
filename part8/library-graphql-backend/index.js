const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const MONGO_DB_USER = 'YOUR_OWN_MONGODB_USERNAME';
const MONGO_DB_ACCESS_KEY = 'YOUR_OWN_MONGODB_PASSWORD';
const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_ACCESS_KEY}@cluster0-xq5jf.mongodb.net/library?retryWrites=true&w=majority`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
    });

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
      
    type Token {
        value: String!
    }
      
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

  type Mutation {
    addBook(
        title: String!
        author: String
        published: Int!
        genres: [String!]
    ): Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    addedBook: Book!
  } 
`;

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        },
        bookCount: async () => {
            const booksInDB = await Book.find({});
            return booksInDB.length;
        },
        authorCount: async () => {
            const authorsInDB = await Author.find({});
            return authorsInDB.length;
        },
        allBooks: async (root, args) => {
            const booksInDB = await Book.find({}).populate('author', { name: 1 });
            let books = booksInDB.map(book => book.toJSON());
            if (args.author) {
                books = books.filter(book => book.author.name === args.author);
            }
            if (args.genre) {
                books = books.filter(book => book.genres.includes(args.genre));
            }
            books = books.map(book => {
                const bookAuthor = book.author;
                bookAuthor.bookCount = booksInDB.filter(book => book.author.name === bookAuthor.name).length;
                bookAuthor.born = bookAuthor.born ? bookAuthor.born : null;
                book.author = bookAuthor;
                return book;
            });
            return books;
        },
        allAuthors: async () => {
            const authorsInDB = await Author.find({});
            const booksInDB = await Book.find({}).populate('author', { name: 1 });
            const authors = authorsInDB.map(author => {
                author = author.toJSON();
                author.bookCount = booksInDB.filter(book => book.author.name === author.name).length;
                return author;
            });
            return authors;
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const authorName = args.author;
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: authorName });
            if (author === null) {
                const newAuthor = new Author({ name: authorName });
                const addedAuthor = await newAuthor.save();
                const bookToAdd = new Book({
                    title: args.title,
                    author: addedAuthor._id,
                    published: args.published,
                    genres: args.genres,
                });
                try {
                    const savedBook = await bookToAdd.save();
                    const addedBook = savedBook.toJSON();
                    const bookAuthor = addedAuthor.toJSON();
                    bookAuthor.bookCount = 1;
                    addedBook.author = bookAuthor;
                    pubsub.publish('BOOK_ADDED', { addedBook });
                    return addedBook;
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            } else {
                const bookToAdd = new Book({
                    title: args.title,
                    author: author._id,
                    published: args.published,
                    genres: args.genres,
                });
                try {
                    const savedBook = await bookToAdd.save();
                    const addedBook = savedBook.toJSON();
                    const bookAuthor = author.toJSON();

                    const booksInDB = await Book.find({}).populate('author', { name: 1 });
                    bookAuthor.bookCount = booksInDB.filter(book => book.author.name === bookAuthor.name).length;
                    addedBook.author = bookAuthor;

                    pubsub.publish('BOOK_ADDED', { addedBook });
                    return addedBook;
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }
        },
        editAuthor: async (root, args, context) => {
            const authorName = args.name;
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            const booksInDB = await Book.find({}).populate('author', { name: 1 });
            const authorToEdit = await Author.findOne({ name: authorName });
            const updatedAuthor = new Author({
                name: authorToEdit.name,
                born: args.setBornTo,
                _id: authorToEdit._id
            });
            try {
                const newAuthor = await Author.findByIdAndUpdate(authorToEdit._id, updatedAuthor, { new: true });
                const author = newAuthor.toJSON();
                author.bookCount = booksInDB.filter(book => book.author.name === author.name).length;
                return author;
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
            try {
                const savedUser = await user.save();
                return savedUser.toJSON();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        addedBook: {
            subscribe: () => {
                return pubsub.asyncIterator(['BOOK_ADDED'])
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})