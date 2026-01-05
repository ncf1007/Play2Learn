import PlayButton from "./PlayButton.jsx"
//import Main from "./Main.jsx"
import './StartScreen.css'

function StartScreen(props){
  //onclick={props.setInGame(true)}
    if (props.inGame === false) {
      return (<main>
        <h1 className="text-center">Play2Learn</h1>
            <div class="container">
              <div class="box"> 
                <h2>Anagram Hunt</h2>
                <p>Do you like Scrabble? Words with Friends? Improve how fast you can recognize anagrams in a word with this neat little game!</p>
                <div className="row mx-1 my-3">
                  <PlayButton id='ah'/>
                </div>
              </div>
              <div class="box"> 
                <h2>Math Facts Practice</h2>
                <p>Improve your mental math skills with this exciting game!</p>
                <div className="row mx-1 my-3">
                    <PlayButton id='mf'/>
                </div>
              </div>
            </div>

            </main>)
    }
    
}
export default StartScreen