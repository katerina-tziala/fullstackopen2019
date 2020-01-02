import React from 'react';
import Part from "./Part";

const Content = ({ parts }) => {
    const courseParts = () => parts.map(part =>
        <Part key={part.id} part={part} />
    );
    return (
        <>
            {courseParts()}
        </>
    )
};

export default Content;