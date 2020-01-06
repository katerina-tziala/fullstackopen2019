const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const testHelper = require('../utils/test-helpers/api_test_helper');
const User = require('../models/user');

beforeAll(async () => {
    await User.deleteMany({});
    const userObjects = testHelper.initialUsers.map(user => new User(user));
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
});

describe('INITIALIZE DATABASE', () => {

    test('INITIALIZE DATABASE', async () => {
        const appUser = {
            name: 'The User',
            username: 'theuser',
            password: 'secretcode'
        };
        
        const usersAtStart = await testHelper.usersInDB();
        const newUser = appUser;
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
        console.log('App User:', appUser);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});