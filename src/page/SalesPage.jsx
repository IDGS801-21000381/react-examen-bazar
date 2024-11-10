// src/pages/SalesPage.jsx
import ListaCompras from '../components/ListaCompras';

const SalesPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Compras registradas</h2>
      <ListaCompras />
    </div>
  );
};

export default SalesPage;
