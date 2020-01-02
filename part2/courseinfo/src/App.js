import React from 'react';
import Course from "./components/Course";

const App = ({ courses }) => {

    const displayCourses = () => courses.map(course =>
        <Course key={course.id} course={course} />
    );
    return (
        <>
            <h1>Web development curriculum</h1>
            {displayCourses()}
        </>
    )
};

export default App;