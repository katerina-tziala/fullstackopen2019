const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');

beforeAll(async () => {
    await User.deleteMany({});
    await api.post('/api/users').send(testHelper.newValidUser);
});

describe('LOGIN', () => {

    test('-- login succeeds with valid data', async () => {
        const userCredentials = testHelper.userCredentials;
        const postResponse = await api
            .post('/api/login')
            .send(userCredentials)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(postResponse.body.token).toBeDefined();
        expect(postResponse.body.username).toBe(userCredentials.username);
        expect(postResponse.body.name).toBe(testHelper.newValidUser.name);
    });

    test('-- login fails if username is missing', async () => {
        const userCredentials = {
            password: testHelper.newValidUser.password
        };
        await api.post('/api/login')
            .send(userCredentials)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- login fails if password is missing', async () => {
        const userCredentials = {
            username: testHelper.newValidUser.username
        };
        await api.post('/api/login')
            .send(userCredentials)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- login fails if username is wrong', async () => {
        const userCredentials = {
            username: 'dummyusername',
            password: testHelper.newValidUser.password
        };
        await api.post('/api/login')
            .send(userCredentials)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('-- login fails if password is wrong', async () => {
        const userCredentials = {
            username: testHelper.newValidUser.username,
            password: 'dummypassword'
        };
        await api.post('/api/login')
            .send(userCredentials)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});