import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../assets/css/users-list.css';
import { getAllUsers } from '../reducers/usersReducer';

const UsersList = (props) => {
    UsersList.propTypes = {
        displayedUsers: PropTypes.array.isRequired
    };

    useEffect(() => {
        props.getAllUsers();
    }, []);

    return (
        <Container>
            <div className="usersContainer">
                <h2>
                    <Icon name='users' />
                    <span>Users</span>
                </h2>
                <Table striped collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={6}>User</Table.HeaderCell>
                            <Table.HeaderCell width={2} textAlign='center'>Created Blogs</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.displayedUsers.map(user =>
                            <Table.Row key={user.id} >
                                <Table.Cell width={6}>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </Table.Cell>
                                <Table.Cell width={2} textAlign='center'>{user.blogs.length}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </Container>
    );
};

const sortByNumberOfBlogs = (userA, userB) => (userA.blogs.length < userB.blogs.length) ? 1 : -1;

const sortByName = (userA, userB) => (userA.name < userB.name) ? -1 : ((userA.name > userB.name) ? 1 : 0);

const getDisplayedUsers = (usersList) => {
    let newList = [...usersList];
    return newList.sort((userA, userB) => {
        return sortByNumberOfBlogs(userA, userB) || sortByName(userA, userB);
    });
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        displayedUsers: getDisplayedUsers(state.users),
    };
};

const mapDispatchToProps = {
    getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);