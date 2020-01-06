import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../reducers/currentUserReducer';
import { setNotification, clearNotification } from '../reducers/notificationsReducer';
import { Grid, Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Notification from './Notification';
import '../assets/css/login.css';

const validator = require('../utils/validator');

const Login = (props) => {
    Login.propTypes = {
        setNotification: PropTypes.func.isRequired,
        clearNotification: PropTypes.func.isRequired,
        loginUser: PropTypes.func.isRequired
    };

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const setPasswordCredential = (event) => setPassword(event.target.value);
    const setUsernameCredential = (event) => setUserName(event.target.value);

    const clearLoginForm = () => {
        setUserName('');
        setPassword('');
        props.clearNotification();
    };

    const credentialsValid = () => (validator.isCredentialValid(username) && validator.isCredentialValid(password));

    const handleLogin = (event) => {
        event.preventDefault();
        if (!credentialsValid()) {
            const message = 'username or password wrong';
            const type = 'error';
            props.setNotification({ message, type }, 8);
            return;
        } else {
            const credentials = { username, password };
            props.loginUser(credentials);
        }
    };

    return (
        <Grid centered columns={1}>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                    <Form onSubmit={handleLogin}>
                        <h1>Login To BlogList</h1>
                        <Notification />
                        <Form.Field>
                            <label>username</label>
                            <input type='text' id='username' name='username' autoComplete='off' value={username} onChange={setUsernameCredential} />
                        </Form.Field>
                        <Form.Field>
                            <label>password</label>
                            <input type='password' id='password' name='password' autoComplete='off' value={password} onChange={setPasswordCredential} />
                        </Form.Field>
                        <Button type='submit' disabled={!credentialsValid()} content='login' primary></Button>
                        <Button type='button' onClick={() => clearLoginForm()} content='clear' secondary></Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
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
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);