import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogsReducer';
import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';
import { Container, Button, Icon, Label } from 'semantic-ui-react';
import '../assets/css/blog.css';

const Blog = (props) => {
    Blog.propTypes = {
        blog: PropTypes.object,
        currentUser: PropTypes.object.isRequired,
        deleteBlog: PropTypes.func.isRequired,
        updateBlog: PropTypes.func.isRequired,
    };

    const currentUser = props.currentUser;
    const blog = props.blog;

    if (blog === undefined) {
        return null;
    }

    const showDeleteButton = { display: currentUser.username === blog.user.username ? '' : 'none' };

    const handleBlogLikesUpdate = () => {
        const updateData = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
            comments: blog.comments
        };
        const successMessage = `You liked "${updateData.title}" by ${updateData.author} blog!`;
        props.updateBlog(blog.id, updateData, successMessage);
    };

    const handleBlogDeletion = () => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
            props.deleteBlog(blog);
            props.history.push('/blogs');
        }
    };

    return (
        <Container>
            <div className="blog">
                <h2>
                    <Icon name='sticky note' />
                    <span>{blog.title}</span>
                </h2>
                <p className='blog__author'><i>By {blog.author}</i></p>
                <p className='blog__link'>
                    See the full blog <a href={blog.url}  target='_blank' rel='noopener noreferrer'>here</a>!
                </p>
                <Button as='div' labelPosition='right'>
                    <Button color='red' onClick={() => handleBlogLikesUpdate()}>
                        <Icon name='heart' />
                        Likes
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>{blog.likes}</Label>
                </Button>
                <p className='blog__addedBy'>Added by {blog.user.name}</p>
                <div className="deleteButtonWrapper">
                    <Button icon onClick={() => handleBlogDeletion()} style={showDeleteButton} color='google plus'>
                        <Icon name='trash alternate' />
                    </Button>
                </div>
                <h3>
                    <Icon name='chat' />
                    <span>Comments</span>
                </h3>
                <AddCommentForm />
                <CommentsList comments={blog.comments} />
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = {
    deleteBlog,
    updateBlog
};
const RoutedBlog = withRouter(Blog);
export default connect(mapStateToProps, mapDispatchToProps)(RoutedBlog);