import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductoCard from './ProductoCard';

const ListaResultados = () => {
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState(new URLSearchParams(useLocation().search).get('search') || '');  // Hacer que el query sea editable
  const [searchBy, setSearchBy] = useState('producto');  // Inicializamos el filtro en 'producto'
  const navigate = useNavigate();  // Para redirigir al usuario

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    // Se actualiza el 'searchBy' según el contenido del input
    if (e.target.value && !isNaN(e.target.value)) {
      setSearchBy('precio'); // Si el valor ingresado es un número, filtramos por precio
    } else {
      setSearchBy('producto'); // Si es texto, filtramos por nombre del producto
    }
  };

  // Función para manejar la búsqueda cuando se presiona Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`?search=${query}&by=${searchBy}`);  // Actualiza la URL y los resultados
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await response.json();

        const resultadosFiltrados = data.products.filter((producto) => {
          if (searchBy === 'precio') {
            return producto.price.toString().includes(query);
          }
          return producto.title.toLowerCase().includes(query.toLowerCase());
        });

        setProductos(resultadosFiltrados);
        localStorage.setItem(`search-${query}`, JSON.stringify(resultadosFiltrados));
      } catch (error) {
        const localData = localStorage.getItem(`search-${query}`);
        if (localData) {
          setProductos(JSON.parse(localData));
        } else {
          console.error("No hay datos disponibles en el almacenamiento local");
        }
      }
    };

    if (query) fetchProductos();
  }, [query, searchBy]);

  return (
    <div className="container">
      {/* Caja de búsqueda que permite editar y enviar la búsqueda */}
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={query}
            onChange={handleSearchChange}
          />
        </form>
        <p>{productos.length} resultados encontrados</p>
      </div>

      {/* Mostrar los productos si hay resultados */}
      <div className="row">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="col-md-4 mb-4">
              <ProductoCard producto={producto} />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default ListaResultados;
