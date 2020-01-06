const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');
const Blog = require('../../models/blog');

let loggedInUser = undefined;

beforeAll(async () => {
    await User.deleteMany({});
    await api.post('/api/users').send(testHelper.newValidUser);
    await Blog.deleteMany({});
    const loginResponse = await api.post('/api/login').send(testHelper.userCredentials);
    loggedInUser = loginResponse.body;
    await api.post('/api/blogs/').auth(loggedInUser.token, { type: 'bearer' }).send(testHelper.newValidBlog);
});

describe('FETCHING MULTIPLE BLOGS WHEN USER AUTHENTICATED', () => {
    test('-- all blog posts are returned as json', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        const postResponse = await api.
            get('/api/blogs/')
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(postResponse.body.length).toBe(blogsInDB.length);
    });

    test('-- the unique identifier property of all blog posts is named id', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        blogsInDB.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    });

    test('-- a specific blog post is within the returned blogs', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        const titles = blogsInDB.map(r => r.title);
        expect(titles).toContain(
            'Type wars'
        );
    });
});

describe('FETCHING A SPECIFIC BLOG WHEN USER AUTHENTICATED', () => {
    test('-- succeeds with a valid id', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        const blogToView = blogsInDB[0];
        const getResponse = await api
            .get(`/api/blogs/${blogToView.id}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(getResponse.body).toEqual(blogToView);
    });

    test('-- fails when blog does not exist', async () => {
        const newBlogResponse = await api.post('/api/blogs/').auth(loggedInUser.token, { type: 'bearer' }).send(testHelper.newValidBlog);
        const validNonexistingId = newBlogResponse.body.id;
        await api.delete(`/api/blogs/${validNonexistingId}`).auth(loggedInUser.token, { type: 'bearer' });
        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(404);
    });

    test('-- fails when id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';
        await api
            .get(`/api/blogs/${invalidId}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(400);
    });
});

describe('FETCHING BLOGS WHEN USER NOT AUTHENTICATED', () => {
    test('-- fetching multple blog posts fails when authorization header not in request', async () => {
        await api.get('/api/blogs/')
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fetching multple blog posts fails when user not authorized', async () => {
        await api.get('/api/blogs/')
            .auth('dummyToken', { type: 'bearer' })
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fetching specific blog fails when authorization header not in request', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        const blogToView = blogsInDB[0];
        await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fetching specific blog fails when user not authorized', async () => {
        const blogsInDB = await testHelper.blogsInDB();
        const blogToView = blogsInDB[0];
        await api
            .get(`/api/blogs/${blogToView.id}`)
            .auth('dummyToken', { type: 'bearer' })
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await mongoose.connection.close();
});