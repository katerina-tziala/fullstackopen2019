import React from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import '../assets/css/users-details.css';

const UserDetails = (props) => {
    UserDetails.propTypes = {
        user: PropTypes.object.isRequired
    };

    const user = props.user;

    if (user === undefined) {
        return null;
    }

    return (
        <Container>
            <div className="userDetails" >
                <h1>{user.name}</h1>
                <h3>Added Blogs: {user.blogs.length}</h3>
                <List bulleted>
                    {user.blogs.map(blog =>
                        <List.Item key={blog.id}> {blog.title} <i> by {blog.author}</i> </List.Item>
                    )}
                </List>
            </div>
        </Container>
    );
};

export default UserDetails;