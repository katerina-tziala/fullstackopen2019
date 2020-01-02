import React from 'react';

const Notification = ({ notification }) => {
    if (!notification) {
        return null;
    }
    return (
        <p>{notification.message}</p>
    );
};

export default Notification;