import React, { useState } from 'react';
import loginService from '../services/loginService';
import Button from './Button';
import Notification from './Notification';
import PropTypes from 'prop-types';

const validator = require('../utils/validator');

const Login = ({ setCurrentUser }) => {
    Login.propTypes = {
        setCurrentUser: PropTypes.func.isRequired
    };
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(undefined);

    const setPasswordCredential = (event) => setPassword(event.target.value);
    const setUsernameCredential = (event) => setUserName(event.target.value);

    const clearLoginForm = () => {
        setUserName('');
        setPassword('');
        setNotification(undefined);
    };

    const credentialsValid = () => (validator.isCredentialValid(username) && validator.isCredentialValid(password));

    const handleLogin = (event) => {
        event.preventDefault();
        if (!credentialsValid()) {
            const message = 'username or pssword wrong';
            const type = 'error';
            notifyUser({ message, type });
            return;
        } else {
            const credentials = { username, password };
            loginService.loginUser(credentials).then(user => {
                clearLoginForm();
                setCurrentUser(user);
                window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
            }).catch(error => {
                const message = error.response.data.error;
                const type = 'error';
                notifyUser({ message, type });
            });
        }
    };

    const notifyUser = (notification) => {
        setNotification(notification);
        setTimeout(() => setNotification(undefined), 8000);
    };


    return (
        <>
            <form onSubmit={handleLogin}>
                <h1>Login To BlogList</h1>
                <Notification notification={notification} />
                <label>
                    <span>username: </span>
                    <input type='text' name='username' autoComplete='off' value={username} onChange={setUsernameCredential} />
                </label>
                <label>
                    <span>password: </span>
                    <input type='password' name='password' autoComplete='off' value={password} onChange={setPasswordCredential} />
                </label>
                <Button handleClick={() => clearLoginForm()} text='clear' disabled={false} />
                <button type="submit" disabled={!credentialsValid()}>login</button>
            </form>
        </>
    );
};

export default Login;