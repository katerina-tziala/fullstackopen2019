const getNotificationActionContent = (notification) => {
    return {
        type: 'NOTIFY',
        data: notification
    };
};

module.exports = { getNotificationActionContent };