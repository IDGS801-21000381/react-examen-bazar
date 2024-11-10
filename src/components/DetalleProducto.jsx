import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate(); // Para redirigir a la página de compras

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await response.json();
        const productoEncontrado = data.products.find((prod) => prod.id === parseInt(id));

        if (productoEncontrado) {
          setProducto(productoEncontrado);
          localStorage.setItem(`product-${id}`, JSON.stringify(productoEncontrado));
        }
      } catch (error) {
        const localData = localStorage.getItem(`product-${id}`);
        if (localData) {
          setProducto(JSON.parse(localData));
        } else {
          console.error("No hay datos disponibles en el almacenamiento local");
        }
      }
    };

    fetchProducto();
  }, [id]);

  const handleCompra = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres realizar esta compra?',
      showDenyButton: true,
      confirmButtonText: 'Sí, comprar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevaCompra = {
          productName: producto.title,
          date: new Date().toISOString(),
          total: producto.price,
        };

        // Obtener el historial de compras actual o crear uno vacío
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
        comprasGuardadas.push(nuevaCompra);

        // Guardar el historial actualizado en localStorage
        localStorage.setItem('compras', JSON.stringify(comprasGuardadas));

        Swal.fire('¡Compra realizada!', '', 'success');
        
        // Redirigir al historial de compras
        navigate('/compras');
      }
    });
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="card">
      <img src={producto.thumbnail} className="card-img-top" alt={producto.title} />
      <div className="card-body">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text">{producto.description}</p>
        <p className="card-text"><strong>Precio:</strong> ${producto.price}</p>
        <p className="card-text"><strong>Stock:</strong> {producto.stock}</p>
        <button className="btn btn-success" onClick={handleCompra}>Comprar</button>
      </div>
    </div>
  );
};

export default DetalleProducto;
