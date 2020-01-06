import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../reducers/currentUserReducer';
import { initializeBlogs } from '../reducers/blogsReducer';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import Notification from './Notification';
import UsersList from './UsersList';
import BlogsView from './BlogsView';
import UserDetails from './UserDetails';
import Blog from './Blog';
import '../assets/css/user-app.css';

const UserApp = (props) => {
    UserApp.propTypes = {
        initializeBlogs: PropTypes.func.isRequired,
        users: PropTypes.array.isRequired,
        blogs: PropTypes.array.isRequired,
        currentUser: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired
    };

    useEffect(() => {
        props.initializeBlogs();
    }, []);


    const getUserByID = (id) => {
        return [...props.users].find(user => user.id === id);
    };

    const geBlogByID = (id) => {
        return [...props.blogs].find(user => user.id === id);
    };

    return (
        <>
            <header>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column floated='left' width={4}>
                            <h1 className='appTitle'>BlogList</h1>
                        </Grid.Column>
                        <Grid.Column floated='right' width={4}>
                            <div className="userInfo">
                                <div className="loggedInUser">
                                    <Icon name='user circle' />
                                    <p className="userName">{props.currentUser.name}</p>
                                </div>
                                <Button type='button' onClick={() => props.logoutUser()} content='logout' secondary></Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </header>
            <Router>
                <Menu inverted>
                    <Menu.Item link >
                        <Link to="/">home</Link>
                    </Menu.Item>
                    <Menu.Item link>
                        <Link to="/blogs">blogs</Link>
                    </Menu.Item>
                    <Menu.Item link >
                        <Link to="/users">users</Link>
                    </Menu.Item>
                </Menu>

                <Notification />

                <Route exact path="/" render={() => <> </>} />
                <Route exact path="/blogs" render={() => <BlogsView />} />
                <Route exact path="/users" render={() => <UsersList />} />
                <Route exact path="/users/:id" render={({ match }) => <UserDetails user={getUserByID(match.params.id)} />} />
                <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={geBlogByID(match.params.id)} />} />
            </Router>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser,
        blogs: state.blogs
    };
};

const mapDispatchToProps = {
    logoutUser,
    initializeBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(UserApp);