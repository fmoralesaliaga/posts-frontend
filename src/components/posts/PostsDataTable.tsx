import React, { useMemo, useCallback } from 'react';
import DataTable, { type TableColumn, type TableAction } from '../ui/DataTable';
import type { Post } from '../../types/post';

interface PostsDataTableProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
  loading: boolean;
  recentlyCreatedIds?: number[]; // IDs de posts recién creados para destacar
  forcePageNumber?: number; // Forzar navegación a una página específica
}

const PostsDataTable: React.FC<PostsDataTableProps> = ({ 
  posts,
  onDeletePost, 
  loading,
  recentlyCreatedIds = [],
  forcePageNumber
}) => {  // Definir las columnas de la tabla - memoizadas para evitar re-renders innecesarios
  const columns: TableColumn<Post>[] = useMemo(() => [    {
      key: 'name',
      header: 'Nombre',
      sortable: true,      
      render: (value) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Descripción',
      sortable: true,
      render: (value) => (
        <div className="max-w-md">
          <p className="text-gray-900 truncate" title={value}>
            {value && value.length > 100 ? `${value.substring(0, 100)}...` : value}
          </p>
        </div>
      ),
    }
  ], []);
  
  // Columnas específicas para el modal con renderizado personalizado
  const detailColumns: TableColumn<Post>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          #{value}
        </span>
      )
    },
    {
      key: 'name',
      header: 'Nombre',
      render: (value) => (
        <div className="font-semibold text-lg text-gray-900">{value}</div>
      )
    },    {
      key: 'description',
      header: 'Descripción',
      render: (value) => (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {value || 'Sin descripción'}
          </p>
        </div>
      )
    },
    {
      key: 'createdAt',
      header: 'Fecha de Creación',
      render: (value) => {
        // Formatear la fecha a formato local
        const date = new Date(value);
        return (
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date.toLocaleString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        );
      }    }
  ], []);
  
  // Definir las acciones disponibles
  const actions: TableAction<Post>[] = useMemo(() => [
    {
      label: 'Delete',
      variant: 'danger',      
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 flex-shrink-0 datatable-icon" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      onClick: (post) => onDeletePost(post.id),    },
  ], [onDeletePost]);  
  
  // Callback memoizado para el ID getter
  const getItemId = useCallback((post: Post) => post.id, []);
  
  return (
    <DataTable
      data={posts}
      columns={columns}
      actions={actions}
      loading={loading}
      emptyMessage="No posts found. Create a new one!"
      className="mt-4"
      pageSize={5}      pageSizeOptions={[5, 10, 25, 50]}
      highlightedIds={recentlyCreatedIds}
      getItemId={getItemId}
      forcePageNumber={forcePageNumber}
      showDetailModal={true}
      detailModalTitle="Detalles del Post"
      detailColumns={detailColumns}
    />
  );
};

export default PostsDataTable;
