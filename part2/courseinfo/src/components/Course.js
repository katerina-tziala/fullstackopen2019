import React from 'react';
import Content from "./Content";
import Total from "./Total";
import Header from "./Header";

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
};

export default Course;