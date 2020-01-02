import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/notification.css';

const Notification = (props) => {
    const notification = props.notification;
    if (notification === null) {
        return null;
    }
    const className = `notification notification--${notification.type}`;
    return (
        <p className={className}>{notification.message}</p>
    );
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    };
};

export default connect( mapStateToProps, null )(Notification);