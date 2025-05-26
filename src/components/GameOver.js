const GameOver = ({ reiniciar }) => {
    return (
        <div>
             <h1>Game Over!</h1>
             <button onClick={reiniciar}>REINICIAR O JOGO</button>
        </div>
    );
}
export default GameOver;