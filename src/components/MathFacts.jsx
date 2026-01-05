import Score from './Score';
import Timer from './Timer';
import Equation from './Equation';
import NumberButton from './NumberButton.jsx';
import PlayButton from './PlayButton.jsx';
import ClearButton from './ClearButton.jsx';
import './MathFacts.css';
import {randInt} from '../helpers/helper.js';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Keyboard from './Keyboard';
import SelectInput from './SelectInput';

function GameMF (props) { //{inGame, operation, maxNumber, gameSelected}
  let randNums = getRandNumbers(props.operation, 0, props.maxNumber);
  const [operands, setOperands] = useState(randNums);
  const operations = [
    ['Addition', '+'],
    ['Subtraction', '-'],
    ['Multiplication', 'x'],
    ['Division', '/']
  ];
  const question = operands.num1 + ' ' + props.operation +
  ' ' + operands.num2; 
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const gameLength = 60;
  const [timeLeft, setTimeLeft] = useState(gameLength);
  const equationClass = answered
  ? 'row my-2 text-primary fade'
  : 'row my-2 text-secondary';
  const numberSelect = [];
  for (let number = 2; number <= 100; number++) {
    numberSelect.push([number, number]);
  }
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const numberButtons = numbers.map((number) => (
    <NumberButton value={number} key={number} handleClick={appendToAnswer} />
  ));
  function checkAnswer(userAnswer) {
    if (isNaN(userAnswer)) return false; // User hasn’t answered

    let correctAnswer;
    switch(props.operation) {
      case '+':
        correctAnswer = operands.num1 + operands.num2;
        break;
      case '-':
        correctAnswer = operands.num1 - operands.num2;
        break;
      case 'x':
        correctAnswer = operands.num1 * operands.num2;
        break;
      default: // division
        correctAnswer = operands.num1 / operands.num2;
    }
    return (parseInt(userAnswer) === correctAnswer);
  }
  if (!answered && checkAnswer(userAnswer)) {
    setAnswered(true);
    setScore(score + 1);
    setTimeout(newQuestion, 300);
  }
  function appendToAnswer(num) {
    setUserAnswer(String(Number(userAnswer + num)));
  }
  function newQuestion() {
    setUserAnswer('');
    setAnswered(false);
    randNums = getRandNumbers(props.operation, 0, props.maxNumber);
    setOperands(randNums);
  }
  function restart() {
    setTimeLeft(gameLength);
    setScore(0);
    newQuestion();
  }
  function getRandNumbers(operator, low, high) {
    let num1 = randInt(low, high);
    let num2 = randInt(low, high);
    const numHigh = Math.max(num1, num2);
    const numLow = Math.min(num1, num2);

    if(operator === '-') { // Make sure higher num comes first
      num1 = numHigh;
      num2 = numLow;
    }

    if(operator === '/') {
      if (num2 === 0) { // No division by zero
        num2 = randInt(1, high);
      }
      num1 = (num1 * num2); // product
    }
    return {num1, num2};
  }

  //if statement causing issues here
  if (props.inGame === false){
    return (<main>
      <h1 className="text-center">Math Facts</h1>
      <div className="row mx-1 my-3">
            <SelectInput label="Operation"
              id="operation"
              currentValue={props.operation}
              setCurrentValue={props.setOperation}
              values={operations} />
              </div>
          <div className="row mx-1 my-3">
            <SelectInput label="Maximum Number"
              id="max-number"
              currentValue={props.maxNumber}
              setCurrentValue={props.setMaxNumber}
              values={numberSelect} />
          </div>
          <div className="row mx-1 my-3">
            {/* <PlayButton onClick={() => props.setInGame(true)} inGame={props.inGame} gameSelected={props.gameSelected}/> */}
            <button className="btn btn-primary form-control m-1" onClick={() => props.setInGame(true)}>play now</button>
          </div>
        </main>)}
  if (timeLeft === 0) {
    return (
      <main>
      <div className="text-center" id="game-container">
        <strong style={{fontSize: "5em"}}>{props.operation}</strong>
        <h2>Time’s Up!</h2>
        <strong style={{fontSize: "1.5em"}}>Your final score is:</strong>
        <div style={{fontSize: "5em"}}>{score}</div>
        <button className="btn btn-primary form-control m-1"
          onClick={restart}>
            Play Again
        </button>
        <Link onClick={() => props.setInGame(false)} className="btn btn-secondary form-control m-1" to="/">
          Back to Start Screen
        </Link>
      </div>
      </main>
    )
  }
   return (
    <main className="text-center" id="game-container">
      <div className={equationClass} id="equation">
        <Equation question={question} answer={userAnswer} />
      </div>
      <div className="row" id="buttons">
        <div className="col">
          {numberButtons}
          <ClearButton handleClick={setUserAnswer} />
        </div>
      </div>
      <div className="row border-bottom" style={{fontSize: "1.5em"}}>
        <div className="col px-3 text-left">
          <Score score={score} />
        </div>
        <div className="col px-3 text-right">
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
        </div>
      </div>
      <div ><Keyboard setUserAnswer={setUserAnswer} /></div>
    </main>

  )
}
export default GameMF