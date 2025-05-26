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

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

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
    
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizerdLetter = letter.toLowerCase();

    //check if letters has already been utilized
    if (guessedLetters.includes(normalizerdLetter) || 
        wrongLetters.includes(normalizerdLetter)) {
        return;
    } 

    //push guessed letter or remove a guess
    if (letters.includes(normalizerdLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizerdLetter
      ]);
    
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizerdLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //Funcção para Limpar os estados
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLettersStates();

      setGameStage(stages[0].name);
    }
  }, [guesses]);

  //reiniciar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen iniciarGame={startGame}/>}
      {gameStage === "game" && (
        <Game 
          verify={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          />
        )}
      {gameStage === "end" && <GameOver reiniciar={retry}/>}
    </div>
  );
}

export default App;