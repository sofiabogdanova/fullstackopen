import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const onGoodClick = () => {
    let newGood = good + 1
    let newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    setNewAverage(newGood, bad, newAll)
    setNewPositive(newGood, newAll)
  }

  const onNeutralClick = () => {
    let newNeutral = neutral + 1
    let newAll = all + 1
    setNeutral(newNeutral)
    setAll(newAll)
    setNewAverage(good, bad, newAll)
    setNewPositive(good, newAll)
  }

  const onBadClick = () => {
    let newBad = bad + 1
    let newAll = all + 1
    setBad(newBad)
    setAll(all + 1)
    setNewAverage(good, newBad, newAll)
    setNewPositive(good, newAll)
  }

  const setNewAverage = (good, bad, all) => {
    let newAverage = (good - bad) / all
    setAverage(newAverage)
  }

  const setNewPositive = (good, all) => {
    let newPositive = good * 100 / all
    setPositive(newPositive)
  }

  if (all === 0) {
    return (
      <>
        <Header header='give feedback' />
        <Button handleClick={onGoodClick} text='good' />
        <Button handleClick={onNeutralClick} text='neutral' />
        <Button handleClick={onBadClick} text='bad' />
        <Header header='statistics' />
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <Header header='give feedback' />
      <Button handleClick={onGoodClick} text='good' />
      <Button handleClick={onNeutralClick} text='neutral' />
      <Button handleClick={onBadClick} text='bad' />
      <Header header='statistics' />
      <table>
        <tbody>
          <Statistics name='good' amount={good} />
          <Statistics name='neutral' amount={neutral} />
          <Statistics name='bad' amount={bad} />
          <Statistics name='all' amount={all} />
          <Statistics name='average' amount={average} />
          <Statistics name='positive' amount={positive} isPercentage={true} />
        </tbody>
      </table>
    </>
  )
}

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}> {text}
      </button>
    </>
  )
}

const Statistics = ({ name, amount, isPercentage }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{amount} {isPercentage && '%'}</td>
    </tr>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)