import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const ListaCompras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    // Intenta obtener las compras de localStorage
    const storedCompras = JSON.parse(localStorage.getItem('compras')) || [];
    setCompras(storedCompras);
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lista de Compras', 14, 20);

    doc.setFontSize(12);
    let yPosition = 30;

    // Cabecera de la tabla
    doc.text('Producto', 14, yPosition);
    doc.text('Fecha', 90, yPosition);
    doc.text('Total', 160, yPosition);
    yPosition += 10;

    // Detalles de las compras
    compras.forEach((compra, index) => {
      doc.text(compra.productName, 14, yPosition);
      doc.text(new Date(compra.date).toLocaleDateString(), 90, yPosition);
      doc.text(`$${compra.total}`, 160, yPosition);
      yPosition += 10;
    });

    // Si no hay compras, mostrar mensaje
    if (compras.length === 0) {
      doc.text('No hay compras registradas', 14, yPosition);
    }

    doc.save('compras.pdf');
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={exportToPDF}>
        Exportar a PDF
      </button>
      <table className="table table-dark table-striped mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {compras.length > 0 ? (
            compras.map((compra, index) => (
              <tr key={index}>
                <td>{compra.productName}</td>
                <td>{new Date(compra.date).toLocaleDateString()}</td>
                <td>${compra.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No hay compras registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCompras;
