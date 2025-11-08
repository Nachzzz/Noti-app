import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Profile.css';

function EliminarComentario({ id, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar este comentario?',
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
        text: 'Debe iniciar sesión para eliminar un comentario.',
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
      const response = await fetch(
        `${apiBaseUrl}infosphere/comments/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
            // QUITAR: 'accept' : 'application/json' ,
            // QUITAR: 'X-CSRFToken': 'kwX597cqhKUv3caED1ZqJxb3zHuZSQsSRFdq00G5kDBy3yeCDX2vzJyucFNHUVmw',
          },
          // QUITAR: credentials: 'include',
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Eliminado',
          text: 'El comentario ha sido eliminado con éxito.',
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
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error. No eres propietario de este comentario',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true
        });
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al intentar eliminar el comentario.',
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

  return (
    <>
      <button className='btnTrash' onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : ''}
        <i className="fa-solid fa-trash">
          <img src="/trash.ico" width='25px' alt="Eliminar comentario" />
        </i>
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default EliminarComentario;
