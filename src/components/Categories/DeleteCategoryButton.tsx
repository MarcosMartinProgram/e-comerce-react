import React from 'react';
import { useMutation } from 'react-query';

interface DeleteCategoryButtonProps {
  categoryId: number;
  onDelete: () => void;
}

const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({ categoryId, onDelete }) => {
  const deleteCategoryMutation = useMutation(async () => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  });

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategoryMutation.mutateAsync();
      onDelete();
    }
  };

  return <button onClick={handleDeleteClick}>Eliminar Categoría</button>;
};

export default DeleteCategoryButton;
