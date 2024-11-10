// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import SearchResults from './page/SearchResults';
import ProductDetailPage from './page/ProductDetailPage';
import SalesPage from './page/SalesPage';
import NotFoundPage from './page/NotFoundPage';
import Menu from './components/Menu';  // Importa el componente de menú
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Mostrar el menú solo si no estamos en la página de inicio */}
        <Menu />
        <div className="container">
          <h1>Bazar universal</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resultados" element={<SearchResults />} />
            <Route path="/detalle/:id" element={<ProductDetailPage />} />
            <Route path="/compras" element={<SalesPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Ruta "catch-all" */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
