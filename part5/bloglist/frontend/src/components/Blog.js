import React, { useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, currentUserName, deleteBlog }) => {
    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        likeBlog: PropTypes.func.isRequired,
        currentUserName: PropTypes.string.isRequired,
        deleteBlog: PropTypes.func.isRequired
    };

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const showInfo = { display: visible ? '' : 'none' };
    const showDeleteButton = { display: currentUserName === blog.user.username ? '' : 'none' };

    return (
        <div className='blog'>
            <div className='blog__title' onClick={() => toggleVisibility()}>
                {blog.title}
            </div>
            <p className='blog__author'><i>by {blog.author}</i></p>
            <div className='blog__info' style={showInfo}>
                <p>{blog.url}</p>
                <p>
                    {blog.likes} likes
                    <Button handleClick={() => likeBlog(blog)} text='like' disabled={false} />
                </p>
                <p className='blog__addedBy'>Added by {blog.user.name}</p>
                <button onClick={() => deleteBlog(blog.id)} style={showDeleteButton}>delete</button>
            </div>
        </div>
    );
};

export default Blog;