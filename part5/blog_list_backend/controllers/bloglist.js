const bloglistRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getDecodedToken = token => {
    return jwt.verify(token, process.env.SECRET);
};

bloglistRouter.get('/', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        const decodedToken = getDecodedToken(request.token);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
        response.json(blogs.map(blog => blog.toJSON()));
    } catch (exception) {
        next(exception);
    }
});

bloglistRouter.post('/', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' });
    }
    const body = request.body;
    try {
        const decodedToken = getDecodedToken(request.token);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        const user = await User.findById(decodedToken.id);
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        });
        try {
            const newBlog = await blog.save();
            user.blogs = user.blogs.concat(newBlog._id);
            await user.save();
            const responseData = newBlog.toJSON();
            responseData.user = user.toJSON();
            response.json(responseData);
        } catch (exception) {
            next(exception);
        }
    } catch (exception) {
        next(exception);
    }
});

bloglistRouter.delete('/:id', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' });
    }
    try {
        const decodedToken = getDecodedToken(request.token);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

bloglistRouter.get('/:id', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        const decodedToken = getDecodedToken(request.token);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
        if (blog) {
            response.json(blog.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

bloglistRouter.put('/:id', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    try {
        const decodedToken = getDecodedToken(request.token);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
        const updatedBlog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            _id: request.params.id
        });
        const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
        if (blog) {
            const user = await User.findById(decodedToken.id);
            const responseData = blog.toJSON();
            responseData.user = user.toJSON();
            response.json(responseData);
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

module.exports = bloglistRouter;