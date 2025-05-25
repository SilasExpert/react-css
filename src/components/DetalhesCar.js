import styles from './DetalhesCar.module.css';

const DetalhesCar = ({ car }) => {
  return (
    <div className={styles.card}>
        <h3> {car.marca}</h3>
        <p>Modelo: {car.modelo}</p>
        <p>KM: {car.km}</p>
    </div>
  );
}
export default DetalhesCar;