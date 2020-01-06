import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import '../assets/css/toggable.css';

const Togglable = React.forwardRef((props, ref) => {
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
        displayCancelButton: PropTypes.bool.isRequired
    };
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const cancelButtonVisibility = { display: props.displayCancelButton ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button type='button' onClick={toggleVisibility} content={props.buttonLabel} primary></Button>
            </div>
            <div className="toggable" style={showWhenVisible}>
                {props.children}
                <Button type='button' onClick={toggleVisibility} style={cancelButtonVisibility} icon secondary>
                    <Icon name='times' />
                </Button>
            </div>
        </div>
    );
});
Togglable.displayName = 'Togglable';
export default Togglable;