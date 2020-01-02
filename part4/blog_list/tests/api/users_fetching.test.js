const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');
const Blog = require('../../models/blog');

beforeAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const userObjects = testHelper.initialUsers.map(user => new User(user));
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
    await api.post('/api/users').send(testHelper.newValidUser);
    const loginResponse = await api.post('/api/login').send(testHelper.userCredentials);
    await api.post('/api/blogs/').auth(loginResponse.body.token, { type: 'bearer' }).send(testHelper.newValidBlog);
});

describe('FETCH USERS', () => {

    test('-- all users are returned as json', async () => {
        const usersInDB = await testHelper.usersInDB();
        const fetchResponse = await api.get('/api/users/')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const fetchedUsers = fetchResponse.body;
        expect(fetchedUsers.length).toBe(usersInDB.length);
    });

    test('-- the unique identifier property of all users is named id', async () => {
        const usersInDB = await testHelper.usersInDB();
        usersInDB.forEach(user => {
            expect(user.id).toBeDefined();
        });
    });

    test('-- the password of all users is not returned', async () => {
        const usersInDB = await testHelper.usersInDB();
        usersInDB.forEach(user => {
            expect(user.password).not.toBeDefined();
        });
    });

    test('-- listing all users displays the blogs created by each user', async () => {
        const usersInDB = await testHelper.usersInDB();
        usersInDB.forEach(user => {
            user.blogs.map(blog => {
                expect(blog.id).toBeDefined();
                expect(blog.user.toString()).toBe(user.id);
                expect(blog.likes).toBeDefined();
                expect(blog.title).toBeDefined();
                expect(blog.url).toBeDefined();
                expect(blog.author).toBeDefined();
            });
        });
    });

});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});