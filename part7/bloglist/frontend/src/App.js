import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './reducers/currentUserReducer';
import { getAllUsers } from './reducers/usersReducer';
import PropTypes from 'prop-types';
import Login from './components/Login';
import UserApp from './components/UserApp';

const App = (props) => {
    App.propTypes = {
        currentUser: PropTypes.object,
        getAllUsers: PropTypes.func.isRequired,
        getLoggedInUser: PropTypes.func.isRequired
    };

    useEffect(() => {
        props.getAllUsers();
    }, []);

    useEffect(() => {
        props.getLoggedInUser();
    }, []);

    return (
        <Router>
            <Route path="/" render={() => props.currentUser === null ? <Redirect to="/login" /> : <UserApp />} />
            <Route path="/login" render={() => props.currentUser !== null ? <Redirect to="/" /> : <Login />} />
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = {
    getAllUsers,
    getLoggedInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);