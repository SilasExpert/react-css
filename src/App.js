//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from 'react';

//COMPONENTS
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

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(
                        Math.random() * Object.keys(categories)
                          .length)];

    const word = words[category][Math.floor(
                        Math.random() * words[category]
                          .length)];

    return { word, category }  
  }, [words]);    

  //Iniciar jogo
  const startGame = useCallback(() => {
    //vlear all letters
    clearLettersStates();
     
    //pick word and pick category
    const { word, category } = pickWordAndCategory();
    
    //create am array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 
    
    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

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

  //Função para Limpar os estados
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);
  
  //check win condition
  useEffect(() => {
     const uniqueLetters = [... new Set(letters)];

     //win condition
     if (guessedLetters.length === uniqueLetters.length) {
      
        //add score
        setScore((actualScore) => (actualScore += 100));

        //restart game with new word
        startGame();
     }
  }, [guessedLetters, letters, startGame]);

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