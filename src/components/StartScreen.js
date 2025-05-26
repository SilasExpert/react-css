import "./StartScreen.css";

const StartScreen = ({iniciarGame}) => {
    return (
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={iniciarGame}>COMEÇAR O JOGO</button>
        </div>
    );
}
export default StartScreen;