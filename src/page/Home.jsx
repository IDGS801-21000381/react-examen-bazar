// src/pages/Home.jsx
import CajaBusqueda from '../components/CajaBusqueda';
import { FaShoppingBag } from 'react-icons/fa'; // Icono de bolso de compras

const Home = () => {
  return (
    <div
      className="container-fluid text-center mt-5"
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '100px',
        backgroundImage: 'url(https://images.arq.com.mx/thumbnails/3/160412.jpg)',
        backgroundSize: 'cover',
        borderRadius: '10%', // Hace la imagen redonda
      }}
    >
      <h1>
        <FaShoppingBag style={{ fontSize: '3rem', marginRight: '10px' }} />
        Busca tu producto
      </h1>
      <CajaBusqueda />
    </div>
  );
};

export default Home;
