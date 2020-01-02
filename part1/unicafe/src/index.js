import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>Give Feedback</h1>;

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
);

const Statistic = ({name, value}) => <tr><th>{name}:</th><td>{value}</td></tr>;

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const positive = good / total;
    const score = ((good * 1) + (bad * (-1))) / total;

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>No Feedback Given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <Statistic name={"good"} value={good} />
                    <Statistic name={"neutral"} value={neutral} />
                    <Statistic name={"bad"} value={bad} />
                    <Statistic name={"all"} value={total} />
                    <Statistic name={"score"} value={score} />
                    <Statistic name={"positive"} value={positive} />
                </tbody>
            </table>
        </>
    )
};



const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setGoodFeedback = newValue => setGood(newValue);
    const setNeutralFeedback = newValue => setNeutral(newValue);
    const setBadFeedback = newValue => setBad(newValue);


    return (
        <>
            <Header />
            <Button handleClick={() => setGoodFeedback(good + 1)} text="good" />
            <Button handleClick={() => setNeutralFeedback(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBadFeedback(bad + 1)} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)