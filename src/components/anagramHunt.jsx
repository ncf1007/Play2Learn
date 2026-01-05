import Score from './Score.jsx';
import Timer from './Timer.jsx';
import './AnagramHunt.css'; 
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Keyboard from './Keyboard.jsx';
import nextArray from '../helpers/helper.js';
import DisplayedWord from './DisplayedWord.jsx';
import { randInt } from '../helpers/helper.js';
import CorrectWordList from './CorrectWordList.jsx';
import SelectInput from './SelectInput.jsx';

function GameAH (props) { //inGame, userWordLen, gameSelected
    const [score, setScore] = useState(0);
    const gameLength = 60;
    const [timeLeft, setTimeLeft] = useState(gameLength);
    const [answered, setAnswered] = useState(false);
    const initArray = [];
    const [currArray, setCurrArray] = useState(initArray); 
    const [userAnswer, setUserAnswer] = useState('');
    const [remainingAnagrams, setRemainingAnagrams] = useState(0);
    const [currWord, setCurrWord] = useState('');
    const [correctWordsGuessed, setCorrectWordsGuessed] = useState([]);
    const numberSelect = [[5,5], [6, 6], [7,7], [8,8]];

    
    function checkAnswerWord(userAnswer) {
      return (
        currArray.includes(userAnswer) &&
        !correctWordsGuessed.includes(userAnswer)
      );
    }
    function restart() {
        setTimeLeft(gameLength);
        setScore(0);
        setCorrectWordsGuessed([]);
        getNextArray();
        //setCurrWord('');
    }
    
    function getNextArray() {
      const newArray = nextArray(props.userWordLen);
      const randIndex = randInt(0, newArray.length - 1);
      const current = newArray[randIndex];
    
      setCurrWord(current);
      setCurrArray(newArray.filter((_, i) => i !== randIndex)); //makes a new array and copies from the previous one but without the removed current word that's displayed
      setRemainingAnagrams(newArray.length - 1);
      setAnswered(false);
      setUserAnswer("");
    }

    function submitAnswer() {
      if (!answered && checkAnswerWord(userAnswer.toLowerCase())) {
        setScore(score => score + 1);
        setRemainingAnagrams(left => left - 1);
        setCorrectWordsGuessed(prev => [...prev, userAnswer]);
        setCurrArray(prev => prev.filter(word => word !== userAnswer));
      }
    }

    useEffect(() => {
      setCorrectWordsGuessed([]);
      getNextArray();
    }, [props.userWordLen]);

    useEffect(() => {
      if (remainingAnagrams === 0) {
        getNextArray();
        setCorrectWordsGuessed([]);
      }
    }, [remainingAnagrams]);

    if (props.inGame === false){
        return (<main>
          <h1 className="text-center">Play2Learn</h1>
              <div className="row mx-1 my-3">
                <SelectInput label="Word Length"
                  id="Word-Length"
                  currentValue={props.userWordLen}
                  setCurrentValue={props.setUserWordLen}
                  values={numberSelect}
                   />
              </div>
              <ol>
                <li>Choose Word Length.</li>
                <li>Press <b>Play!</b></li>
                <li>How many anagrams can you find in a minute?</li>
              </ol>
              <div className="row mx-1 my-3">
                <button className="btn btn-primary form-control m-1" onClick={() => props.setInGame(true)}>play now</button>
              </div>
            </main>)
    }
    if (timeLeft === 0) {
        return (
          <div className="text-center" id="game-container">
            <h1>Anagram Hunt</h1>
            <h2>Time’s Up!</h2>
            <strong style={{fontSize: "1.5em"}}>You Got</strong>
            <div style={{fontSize: "5em"}}>{score}</div>
            <strong style={{fontSize: "1.5em"}}>
              Anagrams
            </strong>
            <button className="btn btn-primary form-control m-1"
              onClick={restart}>
                Play Again
            </button>
        <Link onClick={() => props.setInGame(false)} className="btn btn-secondary form-control m-1" to="/">
          Back to Start Screen
        </Link>
          </div>
        )
      }

    return (<main className="text-center" id="game-container">
        <h1>Anagram Hunt</h1>
        <div className="row border-bottom" style={{fontSize: "1.5em"}}>
        <div className="col px-3 text-left">
          <Score score={score} />
        </div>
        <div className="col px-3 text-right">
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
        </div>
        <div className='col px-3 text-left' id="displayed-word">
          <DisplayedWord currWord={currWord} remainingAnagrams={remainingAnagrams}/>
        </div>
        <div className='text-center'>
        <input
          type="text"
          id="input-box"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitAnswer();
              setUserAnswer('');
            }
          }}
          placeholder="Type here"
        />
        </div>
        <div>
          <CorrectWordList correctWordsGuessed={correctWordsGuessed}
          />
        </div>
      </div> 
      {/* <div ><Keyboard setUserAnswer={setUserAnswer} /></div> */}
    </main>)

}


export default GameAH