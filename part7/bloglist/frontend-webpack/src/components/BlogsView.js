import React from 'react';
import BlogList from './BlogList';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';
import { Container, Icon } from 'semantic-ui-react';
import '../assets/css/blogs-view.css';

const BlogsView = () => {
    const blogFormRef = React.createRef();
    return (
        <>
            <Container>
                <div className="blogsContainer">
                    <h2>
                        <Icon name='sticky note' />
                        <span>Blogs</span>
                    </h2>
                    <Togglable buttonLabel="new blog" displayCancelButton={true} ref={blogFormRef}>
                        <CreateBlogForm blogFormRef={blogFormRef} />
                    </Togglable>
                    <BlogList />
                </div>
            </Container>
        </>
    );
};

export default BlogsView;