const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const testHelper = require('../../utils/test-helpers/api_test_helper');
const User = require('../../models/user');

beforeAll(async () => {
    await User.deleteMany({});
    const userObjects = testHelper.initialUsers.map(user => new User(user));
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
});

describe('USER CREATION', () => {

    test('-- user creation succeeds with valid data', async () => {
        const usersAtStart = await testHelper.usersInDB();
        const newUser = testHelper.newValidUser;
        const postResponse = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(postResponse.body.id).toBeDefined();
        expect(postResponse.body.username).toBe(newUser.username);
        expect(postResponse.body.name).toBe(newUser.name);
        const usersAtEnd = await testHelper.usersInDB();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('-- user creation fails when username is missing', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            password: 'salainen'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- user creation fails when username is less than 3 characters', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            username: 'ml',
            password: 'salainen'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- user creation fails when username is not unique', async () => {
        const newUser = {
            name: 'Arto Hellas',
            username: 'artohellas',
            password: 'artohellaspassword',
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- user creation fails when password is missing', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            username: 'mluukkai'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

    test('-- user creation fails when password is less than 3 characters', async () => {
        const newUser = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'sa'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });

});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});