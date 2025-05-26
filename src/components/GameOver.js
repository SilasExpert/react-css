import "./GameOver.css";

const GameOver = ({ reiniciar, score }) => {
    return (
        <div>
             <h1>Fim de Jogo!</h1>
             <h2>
                A sua pontuação foi: <span>{score}</span>
             </h2>
             <button onClick={reiniciar}>REINICIAR O JOGO</button>
        </div>
    );
}
export default GameOver;