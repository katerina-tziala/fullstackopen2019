import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({ blogList, likeBlog, currentUserName, deleteBlog }) => {
    BlogList.propTypes = {
        blogList: PropTypes.array.isRequired,
        likeBlog: PropTypes.func.isRequired,
        currentUserName: PropTypes.string.isRequired,
        deleteBlog: PropTypes.func.isRequired
    };
    const displayBlogs = () => blogList.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} currentUserName={currentUserName} deleteBlog={deleteBlog} />);
    return (
        <div>
            {displayBlogs()}
        </div>
    );
};

export default BlogList;