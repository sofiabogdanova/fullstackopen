import React from 'react';

const Courses = ( {courses} ) => {
    return (
        <div>
            {courses.map(c => <Course key={c.id} course={c} />)}
        </div>
    )
}

const Course = ({ course }) => {
        return (
            <div>
                <Header course={course} />
                <Content course={course} />
                <Total course={course} />
            </div>
        )
    }

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts
        .map(p => p.exercises)
        .reduce(function (a, b) {
            return a + b;
        });
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(p =>
                <Part key={p.id} part={p} />
            )}
        </div>
    )
}

export default Courses