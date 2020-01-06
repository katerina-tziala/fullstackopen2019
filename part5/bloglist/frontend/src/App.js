import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import UserApp from './components/UserApp';
import blogsService from './services/blogsService';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogsService.setToken(user.token);
        }
    }, []);

    const getCurrentUser = (loggedInUser) => {
        setUser(loggedInUser);
        blogsService.setToken(loggedInUser.token);
    };

    const loggOutUser = () => {
        blogsService.unsetToken();
        window.localStorage.clear();
        setUser(null);
    };

    return (
        <>
            {user === null ?
                <Login setCurrentUser={getCurrentUser} /> :
                <UserApp user={user} loggOutUser={loggOutUser} />
            }
        </>
    );
};

export default App;
