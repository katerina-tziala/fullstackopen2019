const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');
const Blog = require('../../models/blog');

let loggedInUser = undefined;

const newBlogIsValid = (blogToCreate, createdBlog, blogsAtStart, blogsAtEnd, username) => {
    expect(createdBlog.id).toBeDefined();
    expect(createdBlog.title).toBe(blogToCreate.title);
    expect(createdBlog.author).toBe(blogToCreate.author);
    expect(createdBlog.url).toBe(blogToCreate.url);
    expect(createdBlog.user).toBeDefined();
    expect(createdBlog.user.username).toBe(username);
    expect(createdBlog.user.blogs).toContain(createdBlog.id);
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1);
};

beforeAll(async () => {
    await User.deleteMany({});
    await api.post('/api/users').send(testHelper.newValidUser);
    await Blog.deleteMany({});
    const loginResponse = await api.post('/api/login').send(testHelper.userCredentials);
    loggedInUser = loginResponse.body;
});

describe('CREATE BLOG WHEN USER AUTHENTICATED', () => {

    test('-- succeeds with valid data', async () => {
        const newBlog = testHelper.newValidBlog;
        const blogsAtStart = await testHelper.blogsInDB();
        const blogResponse = await api
            .post('/api/blogs/')
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const createdBlog = blogResponse.body;
        const blogsAtEnd = await testHelper.blogsInDB();
        newBlogIsValid(newBlog, createdBlog, blogsAtStart, blogsAtEnd, loggedInUser.username);
        expect(createdBlog.likes).toBe(newBlog.likes);
    });

    test('-- sets default value of likes to 0 if the likes property is missing from the request', async () => {
        const newBlog = {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
        };
        const blogsAtStart = await testHelper.blogsInDB();
        const blogResponse = await api
            .post('/api/blogs/')
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const createdBlog = blogResponse.body;
        const blogsAtEnd = await testHelper.blogsInDB();
        newBlogIsValid(newBlog, createdBlog, blogsAtStart, blogsAtEnd, loggedInUser.username);
        expect(createdBlog.likes).toBe(0);

    });

    test('-- fails when data invaild', async () => {
        const newBlog = {
            author: 'Robert C. Martin',
            likes: 2
        };
        const blogsAtStart = await testHelper.blogsInDB();
        await api
            .post('/api/blogs/')
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(newBlog)
            .expect(400);
        const blogsAtEnd = await testHelper.blogsInDB();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    });
});

describe('CREATE BLOG WHEN USER NOT AUTHORIZED', () => {

    test('-- fails when authorization header not in request', async () => {
        await api
            .post('/api/blogs/')
            .send(testHelper.newValidBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
    test('-- fails when user is not authorized', async () => {
        await api
            .post('/api/blogs/')
            .auth(undefined, { type: 'bearer' })
            .send(testHelper.newValidBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
    test('-- fails when token is invalid', async () => {
        await api
            .post('/api/blogs/')
            .auth('dummyToken', { type: 'bearer' })
            .send(testHelper.newValidBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await mongoose.connection.close();
});