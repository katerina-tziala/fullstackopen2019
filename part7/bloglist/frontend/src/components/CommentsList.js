import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const CommentsList = (props) => {
    CommentsList.propTypes = {
        comments: PropTypes.array.isRequired
    };

    const displayedComments = () => props.comments.sort().map((comment, index) => <List.Item key={index}>{comment}</List.Item>);

    return (
        <List bulleted>
            {displayedComments()}
        </List>
    );
};

export default CommentsList;