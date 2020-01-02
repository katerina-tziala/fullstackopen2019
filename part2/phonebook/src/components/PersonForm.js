import React from 'react';

const PersonForm = (props) => {
    return (
        <form onSubmit={props.submission}>
            <div>
                <span>name: </span>
                <input value={props.newName} onChange={props.nameChange} />
            </div>
            <div>
                <span>number: </span>
                <input value={props.newNumber} onChange={props.numberChange} />
            </div>
            <div>
                <button type="submit" disabled={props.isDisabled}>add</button>
            </div>
        </form>
    )
};

export default PersonForm;