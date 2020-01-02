import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
    <div className='simpleBlog'>
        <div className='simpleBlog__header'>
            {blog.title} {blog.author}
        </div>
        <div className='simpleBlog__likes'>
            blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog;