import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StartScreen from '../components/StartScreen'
import GameAH from '../components/anagramHunt.jsx'
import GameMF from '../components/MathFacts.jsx'
import Game from '../components/Game.jsx'
import Main from '../components/Main.jsx'
import './App.css'

function App() {
  const [operation, setOperation] = useState('x');
  const [maxNumber, setMaxNumber] = useState(10);
  const [userWordLen, setUserWordLen] = useState(8);
  const [gameSelected, setGameSelected] = useState(1);
  const [inGame, setInGame] = useState(false);
  return (
    <>
        <Header />

        <Routes> 
            <Route exact path="/" element={<StartScreen operation={operation}
          setOperation={setOperation} maxNumber={maxNumber} setMaxNumber={setMaxNumber} userWordLen={userWordLen} 
          setUserWordLen={setUserWordLen} gameSelected={gameSelected} setGameSelected={setGameSelected} inGame={inGame} setInGame={setInGame}/>} /> 
          <Route exact path="/play" element={<Main operation={operation}
          maxNumber={maxNumber} />} />
            <Route exact path="/playAH" element={<GameAH userWordLen={userWordLen} 
          setUserWordLen={setUserWordLen} gameSelected={gameSelected} setGameSelected={setGameSelected} inGame={inGame} setInGame={setInGame}/>} />
            <Route exact path="/playMF" element={<GameMF inGame={inGame} setInGame={setInGame} operation={operation} setOperation={setOperation}
            maxNumber={maxNumber} setMaxNumber={setMaxNumber} gameSelected={gameSelected}/>} /> 
        </Routes>

        <Footer />

    </>
  )
}
export default App;
