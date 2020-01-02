const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');
const Blog = require('../../models/blog');

let loggedInUser = undefined;

const getBlogWithUpdatedValues = (blogToUpdate) => {
    blogToUpdate.title = 'update test';
    blogToUpdate.author = 'Katerina Tziala';
    blogToUpdate.likes = 45;
    return blogToUpdate;
};

const updatedBlogIsValid = (blogToUpdate, updatedBlog, blogsAtStart, blogsAtEnd) => {
    expect(updatedBlog.id).toBeDefined();
    expect(updatedBlog.title).toBe(blogToUpdate.title);
    expect(updatedBlog.author).toBe(blogToUpdate.author);
    expect(updatedBlog.url).toBe(blogToUpdate.url);
    expect(blogsAtEnd.length).toBe(blogsAtStart.length);
};

beforeAll(async () => {
    await User.deleteMany({});
    await api.post('/api/users').send(testHelper.newValidUser);
    await Blog.deleteMany({});
    const loginResponse = await api.post('/api/login').send(testHelper.userCredentials);
    loggedInUser = loginResponse.body;
    await api.post('/api/blogs/').auth(loggedInUser.token, { type: 'bearer' }).send(testHelper.newValidBlog);
});

describe('UPDATING BLOG WHEN USER AUTHENTICATED', () => {

    test('-- succeeds when id is valid', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToUpdate = getBlogWithUpdatedValues(blogsAtStart[0]);

        const updateResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const updatedBlog = updateResponse.body;
        expect(updatedBlog.likes).toBe(blogToUpdate.likes);
        const blogsAtEnd = await testHelper.blogsInDB();
        updatedBlogIsValid(blogToUpdate, updatedBlog, blogsAtStart, blogsAtEnd);
    });

    test('-- succeeds when id is valid and likes set to 0 if update data likes value is undefined', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToUpdate = getBlogWithUpdatedValues(blogsAtStart[0]);
        blogToUpdate.likes = undefined;

        const updateResponse = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const updatedBlog = updateResponse.body;
        expect(updatedBlog.likes).toBe(0);
        const blogsAtEnd = await testHelper.blogsInDB();
        updatedBlogIsValid(blogToUpdate, updatedBlog, blogsAtStart, blogsAtEnd);
    });

    test('-- fails when blog does not exist', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const newBlogResponse = await api.post('/api/blogs/').auth(loggedInUser.token, { type: 'bearer' }).send(testHelper.newValidBlog);
        const blogToUpdate = getBlogWithUpdatedValues(newBlogResponse.body);
        const validNonexistingId = blogToUpdate.id;
        await api.delete(`/api/blogs/${validNonexistingId}`).auth(loggedInUser.token, { type: 'bearer' });
        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(blogToUpdate)
            .expect(404);
        const blogsAtEnd = await testHelper.blogsInDB();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    });

    test('-- fails when id is invalid', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToUpdate = getBlogWithUpdatedValues(blogsAtStart[0]);
        const invalidId = '5a3d5da59070081a82a3445';
        await api
            .put(`/api/blogs/${invalidId}`)
            .auth(loggedInUser.token, { type: 'bearer' })
            .send(blogToUpdate)
            .expect(400);
        const blogsAtEnd = await testHelper.blogsInDB();
        expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    });

});

describe('UPDATING BLOG WHEN USER NOT AUTHENTICATED', () => {

    test('-- fails when authorization header not in request', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToUpdate = blogsAtStart[0];
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- fails when user not authorized', async () => {
        const blogsAtStart = await testHelper.blogsInDB();
        const blogToUpdate = blogsAtStart[0];
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .auth('dummyToken', { type: 'bearer' })
            .send(blogToUpdate)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await mongoose.connection.close();
});