import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotification, clearNotification } from '../reducers/notificationsReducer';
import { createBlog } from '../reducers/blogsReducer';
import { useField } from '../hooks/useField';
import { Form, Button } from 'semantic-ui-react';

const validator = require('../utils/validator');

const CreateBlogForm = (props) => {
    CreateBlogForm.propTypes = {
        clearNotification: PropTypes.func.isRequired,
        createBlog: PropTypes.func.isRequired,
        setNotification: PropTypes.func.isRequired,
        blogFormRef: PropTypes.object.isRequired
    };

    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const clearBlogForm = () => {
        title.reset();
        author.reset();
        url.reset();
        props.clearNotification();
    };

    const getNewBlogValues = () => {
        const newBlog = {
            title: title.value.trim(),
            author: author.value.trim(),
            url: url.value.trim()
        };
        return newBlog;
    };

    const blogValuesAreValid = (newBlogValues) => {
        if (validator.isEmptyString(newBlogValues.title) || validator.isEmptyString(newBlogValues.author) || validator.isEmptyString(newBlogValues.url)) {
            return false;
        }
        if (newBlogValues.title.length < 5 || newBlogValues.author.length < 2 || newBlogValues.url.length < 5) {
            return false;
        }
        return true;
    };

    const handleBlogCreation = (event) => {
        event.preventDefault();
        const newBlog = getNewBlogValues();
        if (!blogValuesAreValid(newBlog)) {
            const type = 'error';
            const message = 'Blog information are NOT correct!';
            props.setNotification({ message, type }, 8);
            return;
        } else {
            clearBlogForm();
            props.createBlog(newBlog);
            props.blogFormRef.current.toggleVisibility();
        }
    };

    const submissionIsDisabled = () => {
        return blogValuesAreValid(getNewBlogValues()) ? false : true;
    };

    return (
        <Form onSubmit={handleBlogCreation}>
            <h2>Create Blog</h2>
            <Form.Field>
                <label>title</label>
                <input id='title' name='title' autoComplete='off' type={title.type} value={title.value} onChange={title.onChange} />
            </Form.Field>
            <Form.Field>
                <label>author</label>
                <input id='author' name='author' autoComplete='off' type={author.type} value={author.value} onChange={author.onChange} />
            </Form.Field>
            <Form.Field>
                <label>url</label>
                <input id='url' name='url' autoComplete='off' type={url.type} value={url.value} onChange={url.onChange} />
            </Form.Field>

            <Button type='submit' disabled={submissionIsDisabled()} content='create' primary></Button>
            <Button type='button' onClick={() => clearBlogForm()} content='clear' secondary></Button>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    };
};

const mapDispatchToProps = {
    setNotification,
    clearNotification,
    createBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlogForm);