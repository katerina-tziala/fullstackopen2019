import React, { useState, useEffect } from 'react';
import blogsService from '../services/blogsService';
import Notification from './Notification';
import Button from './Button';
import CreateBlogForm from './CreateBlogForm';
import BlogList from './BlogList';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const UserApp = (props) => {
    UserApp.propTypes = {
        user: PropTypes.object.isRequired,
        loggOutUser: PropTypes.func.isRequired
    };

    const blogFormRef = React.createRef();
    const user = props.user;
    const [userBlogs, setUserBlogs] = useState([]);
    const [notification, setNotification] = useState(undefined);

    useEffect(() => {
        blogsService.getAll().then(allBlogs => {
            setUserBlogs(allBlogs);
        });
    }, []);

    const addBlog = (newBlog) => {
        blogFormRef.current.toggleVisibility();
        blogsService.create(newBlog).then(addedBlog => {
            const type = 'success';
            const message = `A new blog "${addedBlog.title}" by ${addedBlog.author} was added!`;
            notifyUser({ message, type });
            setUserBlogs(userBlogs.concat(addedBlog));
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            notifyUser({ message, type });
        });
    };

    const notifyUser = (notification) => {
        setNotification(notification);
        setTimeout(() => setNotification(undefined), 8000);
    };

    const likeBlog = (blog) => {
        const updateData = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        };
        blogsService.update(blog.id, updateData).then(updatedBlog => {
            const type = 'success';
            const message = `You liked "${updatedBlog.title}" by ${updatedBlog.author} blog!`;
            notifyUser({ message, type });
            const newBlogs = [...userBlogs].filter(blog => blog.id !== updatedBlog.id);
            newBlogs.push(updatedBlog);
            setUserBlogs(newBlogs);
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            notifyUser({ message, type });
        });
    };

    const getSortedBlogs = () => {
        let newList = [...userBlogs];
        return newList.sort((blogA, blogB) => (blogA.likes < blogB.likes) ? 1 : -1);
    };

    const deleteBlog = (blogId) => {
        const blogToDelete = [...userBlogs].find(blog => blog.id === blogId);
        if (window.confirm(`Do you really want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)) {
            blogsService.deleteBlog(blogId).then(() => {
                const newBlogs = [...userBlogs].filter(blog => blog.id !== blogId);
                const type = 'success';
                const message = `The blog "${blogToDelete.title}" by ${blogToDelete.author} was deleted!`;
                notifyUser({ message, type });
                setUserBlogs(newBlogs);
            }).catch(error => {
                const message = error.response.data.error;
                const type = 'error';
                notifyUser({ message, type });
            });
        }
    };

    return (
        <>
            <h1>BlogList App</h1>
            <p>{user.name} logged in
                <Button handleClick={() => props.loggOutUser()} text='loggout' disabled={false} />
            </p>
            <Notification notification={notification} />
            <Togglable buttonLabel="new blog" displayCancelButton={true} ref={blogFormRef}>
                <h2>Create</h2>
                <CreateBlogForm addBlog={addBlog} notifyUser={notifyUser} />
            </Togglable>
            <BlogList blogList={getSortedBlogs()} likeBlog={likeBlog} currentUserName={user.username} deleteBlog={deleteBlog} />
        </>
    );
};

export default UserApp;
