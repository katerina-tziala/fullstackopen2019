import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { useField } from '../hooks/useField';

const validator = require('../utils/validator');

const CreateBlogForm = (props) => {
    CreateBlogForm.propTypes = {
        notifyUser: PropTypes.func.isRequired,
        addBlog: PropTypes.func.isRequired
    };

    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const clearBlogForm = () => {
        title.reset();
        author.reset();
        url.reset();
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
            const message = 'Blog info are not correct!';
            props.notifyUser({ message, type });
            return;
        } else {
            clearBlogForm();
            props.addBlog(newBlog);
        }
    };

    return (
        <form onSubmit={handleBlogCreation}>
            <label>
                <span>title: </span>
                <input name='title' autoComplete='off' type={title.type} value={title.value} onChange={title.onChange} />
            </label>
            <label>
                <span>author: </span>
                <input name='author' autoComplete='off' type={author.type} value={author.value} onChange={author.onChange} />
            </label>
            <label>
                <span>url: </span>
                <input name='url' autoComplete='off' type={url.type} value={url.value} onChange={url.onChange} />
            </label>
            <button type="submit" disabled={!blogValuesAreValid(getNewBlogValues())}>create</button>
            <Button handleClick={() => clearBlogForm()} text='clear' disabled={false} />
        </form>
    );
};

export default CreateBlogForm;