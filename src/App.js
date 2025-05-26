//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from 'react';

//COMPONENTS
import AppAulas from './components/AppAulas';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//DATA
import { wordsList } from './components/data/words';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(
                        Math.random() * Object.keys(categories)
                          .length)];
      console.log(category);

    const word = words[category][Math.floor(
                        Math.random() * words[category]
                          .length)];
      console.log(word);

    return { word, category }  
  };    

  //Iniciar jogo
  const startGame = () => {
    const { word, category } = pickWordAndCategory();
    
    //create am array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 
    
    console.log(word, category);
    console.log(wordLetters);
    
    setPickedWord(pickedWord);
    setPickedCategory(pickedCategory);
    setLetters(letters);

    setGameStage(stages[1].name);
  };

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  //reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen iniciarGame={startGame}/>}
      {gameStage === "game" && <Game verify={verifyLetter}/>}
      {gameStage === "end" && <GameOver reiniciar={retry}/>}
    </div>
  );
}

export default App;