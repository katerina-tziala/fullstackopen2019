const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!body.username) {
        return response.status(400).json({ error: 'username is missing' });
    }
    if (!body.password) {
        return response.status(400).json({ error: 'password is missing' });
    }
    if (body.password && body.password.toString().length < 3) {
        return response.status(401).json({
            error: 'password too short'
        });
    }
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;