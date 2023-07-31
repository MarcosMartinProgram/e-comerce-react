import React from 'react';
import { useMutation } from 'react-query';

interface DeleteButtonProps {
  productId: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ productId, onDelete }) => {
  const deleteProductMutation = useMutation(async () => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  });

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProductMutation.mutateAsync();
      onDelete();
    }
  };

  return <button onClick={handleDeleteClick}>Eliminar Producto</button>;
};

export default DeleteButton;
