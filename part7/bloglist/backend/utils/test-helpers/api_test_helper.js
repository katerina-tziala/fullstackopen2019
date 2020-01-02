const User = require('../../models/user');
const Blog = require('../../models/blog');

const initialUsers = [
    {
        _id: '5ded0e436bc18615b0ec159b',
        name: 'Katerina Tziala',
        username: 'rootuser',
        password: 'adminpassword',
        __v: '0'
    },
    {
        _id: '5ded0e436bc18615b0ec159a',
        name: 'Arto Hellas',
        username: 'artohellas',
        password: 'artohellaspassword',
        __v: '0'
    }
];

const newValidUser = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
};

const userCredentials = {
    username: newValidUser.username,
    password: newValidUser.password
};

const newValidBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
};

const usersInDB = async () => {
    const users = await User.find({}).populate('blogs');
    return users.map(blog => blog.toJSON());
};

const blogsInDB = async () => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialUsers,
    newValidUser,
    userCredentials,
    newValidBlog,
    usersInDB,
    blogsInDB
};