import blogsService from '../services/blogsService';
const actionHelper = require('../utils/actionHelper');

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        state = action.data;
        return state;
    case 'NEW_BLOG':
        return [...state, action.data];
    case 'DELETE_BLOG':
        state = [...state].filter(blog => blog.id !== action.data.id);
        return state;
    case 'UPDATE_BLOG':
        state = [...state].map(blog => blog.id !== action.data.id ? blog : action.data);
        return state;
    default:
        return state;
    }
};

export const initializeBlogs = () => {
    return dispatch => {
        blogsService.getAll().then(allBlogs => {
            dispatch({
                type: 'INIT_BLOGS',
                data: allBlogs
            });
        }).catch(error => {
            console.log(error);
        });
    };
};

export const createBlog = (newBlog) => {
    return dispatch => {
        blogsService.create(newBlog).then(addedBlog => {
            const type = 'success';
            const message = `A new blog "${addedBlog.title}" by ${addedBlog.author} was added!`;
            dispatch({
                type: 'NEW_BLOG',
                data: addedBlog
            });
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        });
    };
};

export const deleteBlog = (blogToDelete) => {
    return dispatch => {
        blogsService.deleteBlog(blogToDelete.id).then(() => {
            const type = 'success';
            const message = `The blog "${blogToDelete.title}" by ${blogToDelete.author} was deleted!`;
            dispatch({
                type: 'DELETE_BLOG',
                data: blogToDelete
            });
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        });
    };
};

export const updateBlog = (blogId, updateData, successMessage) => {
    return dispatch => {
        blogsService.update(blogId, updateData).then(updatedBlog => {
            const type = 'success';
            const message = successMessage;
            dispatch({
                type: 'UPDATE_BLOG',
                data: updatedBlog
            });
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        });
    };
};

export default reducer;