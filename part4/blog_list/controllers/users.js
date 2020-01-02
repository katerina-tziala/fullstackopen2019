const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs');
        response.json(users.map(blog => blog.toJSON()));
    } catch (exception) {
        next(exception);
    }
});

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.password  || !body.username) {
            return response.status(400).json({ error: 'content is missing' });
        }
        if (body.password && body.password.length < 3) {
            return response.status(400).json({ error: 'password must be at least 3 characters long' });
        }
        if (body.username && body.username.length < 3) {
            return response.status(400).json({ error: 'username must be at least 3 characters long' });
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            name: body.name,
            username: body.username,
            password: passwordHash,
        });
        const savedUser = await user.save();
        response.json(savedUser);
    } catch (exception) {
        next(exception);
    }
});

module.exports = usersRouter;