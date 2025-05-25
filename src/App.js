import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import DetalhesCar from './components/DetalhesCar';

function App() {

  const colorTeste = true;
  const [myStyle] = useState('teste');
  const carros = [
    {id: 1, modelo: 'Sandero', marca: 'Renault', km: 100},
    {id: 2, modelo: 'Tracker', marca: 'Chevrolet', km: 350},
    {id: 3, modelo: 'Sandero Stap Way', marca: 'Renault', km: 0}
  ];

  return (
    <div className="App">
      <h1> Teste </h1>
      {/* CSS inline dinâmico com if ternário */}
      <h2 style={colorTeste ? { color: 'green'} : {color: 'red' }}>Olá, Mundo!</h2>

      <h2 style={ myStyle === 'teste' ? { color: 'blue', background: '#000'} : null }>Olá, Mundo!</h2>
      
      <h2 className={ colorTeste ? 'red-title' : 'title' }>
        Este título vai ter classe dinâmica
      </h2>
      
      <Title />
    
      <h1>Show de Carros</h1>
      <div className='car_container'>
        {carros.map((carro) => (
            <DetalhesCar car={carro} />
        ))} 
      </div>
   
    </div>
  );
}

export default App;
