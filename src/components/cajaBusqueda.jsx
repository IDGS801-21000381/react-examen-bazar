import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CajaBusqueda = () => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('producto'); // Mantén el valor inicial para determinar el filtro
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/resultados?search=${query}&by=${searchBy}`);
    }
  };

  // Función para manejar el cambio de búsqueda
  const handleChange = (e) => {
    setQuery(e.target.value);
    // Se actualiza el 'searchBy' según el contenido del input (esto depende de la lógica de negocio que desees)
    if (e.target.value && !isNaN(e.target.value)) {
      setSearchBy('precio'); // Si el valor ingresado es un número, filtramos por precio
    } else {
      setSearchBy('producto'); // Si es texto, filtramos por nombre del producto
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4">
      <input
        type="text"
        className="form-control me-2 mb-2 mb-md-0"
        placeholder={`Buscar por ${searchBy}...`}
        value={query}
        onChange={handleChange}
        style={{ borderRadius: '30px', padding: '10px' }}
      />
      <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px' }}>
        Buscar
      </button>
    </form>
  );
};

export default CajaBusqueda;
