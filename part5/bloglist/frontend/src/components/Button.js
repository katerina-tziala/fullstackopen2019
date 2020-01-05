import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    Button.propTypes = {
        disabled: PropTypes.bool.isRequired,
        handleClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    };

    return (
        <button type="button" disabled={props.disabled} onClick={props.handleClick}>
            {props.text}
        </button>
    );
};


export default Button;