import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
    Notification.propTypes = {
        notification: PropTypes.object
    };
    if (!notification) {
        return null;
    }
    const className = `notification notification--${notification.type}`;
    return (
        <p className={className}>{notification.message}</p>
    );
};

export default Notification;