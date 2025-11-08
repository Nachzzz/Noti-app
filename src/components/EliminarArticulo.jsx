import React, { useState } from 'react';
import Swal from 'sweetalert2';

function EliminarArticulo({ id, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  console.log('EliminarArticulo - ID recibido:', id); // Debug

  const handleDelete = async () => {
    // Verificar que el ID sea válido
    if (!id) {
      Swal.fire({
        title: 'Error',
        text: 'ID de artículo no válido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: true
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const token = localStorage.getItem('authToken');

    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para eliminar un artículo.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true
      });
      setIsDeleting(false);
      return;
    }

    try {
      console.log('Eliminando artículo con ID:', id); // Debug
      const response = await fetch(
        `${apiBaseUrl}infosphere/articles/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );

      console.log('Response status:', response.status); // Debug

      if (response.ok) {
        Swal.fire({
          title: 'Eliminado',
          text: 'El artículo ha sido eliminado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true
        }).then(() => {
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        });
      } else {
        let errorMessage = 'Error al eliminar el artículo';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Si no se puede parsear JSON, usar el status
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true
        });
      }
    } catch (e) {
      console.error('Error eliminando artículo:', e);
      Swal.fire({
        title: 'Error',
        text: 'Error de red al intentar eliminar el artículo.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // No mostrar el botón si no hay ID válido
  if (!id) {
    return null;
  }

  return (
    <>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar Artículo'}
        <i className="fa-solid fa-trash"></i>
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default EliminarArticulo;
