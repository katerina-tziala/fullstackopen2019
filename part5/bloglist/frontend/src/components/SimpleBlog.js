import React from 'react';
import PropTypes from 'prop-types';

const SimpleBlog = ({ blog, onClick }) => {
    SimpleBlog.propTypes = {
        blog: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    };

    return (
        <div className='simpleBlog'>
            <div className='simpleBlog__header'>
                {blog.title} {blog.author}
            </div>
            <div className='simpleBlog__likes'>
                blog has {blog.likes} likes
                <button onClick={onClick}>like</button>
            </div>
        </div>
    );
};

export default SimpleBlog;