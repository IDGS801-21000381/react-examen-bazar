import { Link } from 'react-router-dom';

const ProductoCard = ({ producto }) => {
  return (
    <div className="card h-100">
      <img src={producto.thumbnail} className="card-img-top" alt={producto.title} />
      <div className="card-body">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text">${producto.price}</p>
        <Link to={`/detalle/${producto.id}`} className="btn btn-primary">Ver Detalles</Link>
      </div>
    </div>
  );
};

export default ProductoCard;
