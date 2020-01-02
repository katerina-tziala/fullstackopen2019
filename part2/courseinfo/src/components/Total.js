import React from 'react';

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => ({ exercises: s.exercises + p.exercises })).exercises;
    return (
        <p>
            <b>Total of {total} exercises.</b>
        </p>
    )
};

export default Total;