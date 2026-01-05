import PlayButton from "./PlayButton"
import SelectInput from "./SelectInput"
import './Main.css'

function Main(props){
  //TODO: cut main component out and move sections to their respective games
  if (props.selectedGame === 0) {
    return (<main>
      <h1 className="text-center">Play2Learn</h1>
          <div className="row mx-1 my-3">
            <SelectInput label="Word Length"
              id="Word Length"
              currentValue={props.wordLen}
              setCurrentValue={props.setWordLen}
               />
          </div>
          <ol>
            <li>Choose Word Length.</li>
            <li>Press <b>Play!</b></li>
            <li>How many anagrams can you find in a minute?</li>
          </ol>
          <div className="row mx-1 my-3">
            <PlayButton id="MainAH" gameSelected={props.gameSelected} />
          </div>
        </main>)
   }
   return (<main>
    <h1 className="text-center">Play2Learn</h1>
        <div className="row mx-1 my-3">
          <SelectInput label="Word Length"
            id="Word Length"
            currentValue={props.wordLen}
            setCurrentValue={props.setWordLen}
             />
        </div>
        <div className="row mx-1 my-3">
          <PlayButton id="MainMF" gameSelected={props.gameSelected} />
        </div>
      </main>
   )
    
}
export default Main