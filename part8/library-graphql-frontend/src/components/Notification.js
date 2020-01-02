import React from 'react';

const Notification = ({ notification }) => {
    if (notification === null) {
        return null;
    }
    const className = `notification notification--${notification.type}`;
    return (
        <p className={className}>{notification.message}</p>
    );
};

export default Notification;