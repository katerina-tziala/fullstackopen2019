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

describe('DELETE BLOG', () => {

    test('-- fails when authorization header not in request', async () => {
        const invalidId = '5a3d5da59070081a82a3445';
        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fails when user is not authorized', async () => {
        const invalidId = '5a3d5da59070081a82a3445';
        await api
            .delete(`/api/blogs/${invalidId}`)
            .auth('dummyToken', { type: 'bearer' })
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fails when user is authorized and id invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';
        await api
            .delete(`/api/blogs/${invalidId}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- succeeds when user is authorized and id is valid', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .expect(204);

        const blogsAtEnd = await testHelper.blogsInDB();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);

        const ids = blogsAtEnd.map(r => r.id);
        expect(ids).not.toContain(blogToDelete.id);
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await mongoose.connection.close();
});