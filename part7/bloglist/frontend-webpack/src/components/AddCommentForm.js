import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotification, clearNotification } from '../reducers/notificationsReducer';
import { updateBlog } from '../reducers/blogsReducer';
import { useField } from '../hooks/useField';
import { Form, Button } from 'semantic-ui-react';

const validator = require('../utils/validator');

const AddCommentForm = (props) => {
    AddCommentForm.propTypes = {
        clearNotification: PropTypes.func.isRequired,
        setNotification: PropTypes.func.isRequired,
        updateBlog: PropTypes.func.isRequired,
        displayedBlog: PropTypes.object.isRequired
    };

    const comment = useField('text');

    const clearCommentForm = () => {
        comment.reset();
        props.clearNotification();
    };

    const commentIsValid = (value) => {
        if (validator.isEmptyString(value) || value.length < 4) {
            return false;
        }
        return true;
    };

    const handleCommentAddition = (event) => {
        event.preventDefault();
        const newComment = comment.value.trim();
        if (commentIsValid(newComment)) {
            const blogToUpdate = props.displayedBlog;
            const updatedComments = [...blogToUpdate.comments];
            updatedComments.push(newComment);
            const updateData = {
                user: blogToUpdate.user.id,
                likes: blogToUpdate.likes,
                author: blogToUpdate.author,
                title: blogToUpdate.title,
                url: blogToUpdate.url,
                comments: updatedComments
            };
            const successMessage = `You comment "${newComment}" was added to blog "${updateData.title}" by ${updateData.author}!`;
            props.updateBlog(blogToUpdate.id, updateData, successMessage);
            clearCommentForm();
        } else {
            const type = 'error';
            let message;
            if (validator.isEmptyString(newComment)) {
                message = 'Comment can NOT be blank!';
            } else if (newComment.length < 4) {
                message = 'At least four characters are required for a comment!';
            }
            props.setNotification({ message, type }, 8);
        }
    };


    const submissionIsDisabled = () => {
        return commentIsValid(comment.value.trim()) ? false : true;
    };

    return (
        <Form onSubmit={handleCommentAddition}>
            <Form.Field>
                <label>comment</label>
                <input id='comment' name='comment' autoComplete='off' type={comment.type} value={comment.value} onChange={comment.onChange} />
            </Form.Field>
            <Button type='submit' disabled={submissionIsDisabled()} content='add comment' primary></Button>
            <Button type='button' onClick={() => clearCommentForm()} content='clear' secondary></Button>
        </Form>
    );
};

const getBlogID = () => window.location.href.split('/').pop();

const getDisplayedBlog = (blogsList) => [...blogsList].find(blog => blog.id === getBlogID());

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notification: state.notification,
        displayedBlog: getDisplayedBlog(state.blogs),
    };
};

const mapDispatchToProps = {
    setNotification,
    clearNotification,
    updateBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);