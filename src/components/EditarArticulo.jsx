import React, { useState } from 'react';


function EliminarArt({ id, onDeleteSuccess }) {
  
  return (
    <>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar Articulo'}<i className="fa-solid fa-trash"></i>
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default EliminarArt;
