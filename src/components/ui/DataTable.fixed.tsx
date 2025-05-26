import React, { useState, useMemo, useEffect } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  show?: (item: T) => boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (newPageSize: number) => void;
  highlightedIds?: number[]; // IDs de elementos a destacar
  getItemId?: (item: T) => number; // Función para obtener el ID del elemento
}

type SortDirection = 'asc' | 'desc' | null;

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  pageSize = 5,
  pageSizeOptions = [5, 10, 25, 50, 100],
  onPageSizeChange,
  highlightedIds = [],
  getItemId = (item: T) => item.id,
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  // Actualizar total de páginas cuando cambia la data o el pageSize
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(data.length / pageSize));
    setTotalPages(newTotalPages);
    // Si la página actual es mayor al nuevo total de páginas, ajustar a la última página
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [data, pageSize, currentPage]);

  // Función para manejar el ordenamiento
  const handleSort = (column: keyof T) => {
    if (!columns.find(col => col.key === column)?.sortable) return;

    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    // Volver a la primera página al cambiar el ordenamiento
    setCurrentPage(1);
  };

  // Datos ordenados
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });
  }, [data, sortColumn, sortDirection]);
  
  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Función para ir a una página específica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para cambiar el tamaño de la página
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    // Si hay un callback externo para manejar el cambio de tamaño de página, llamarlo
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    } else {
      // Sino, manejarlo internamente
      const firstItemIndex = (currentPage - 1) * pageSize;
      const newCurrentPage = Math.floor(firstItemIndex / newPageSize) + 1;
      setCurrentPage(newCurrentPage);
    }
  };

  // Generar array de páginas para mostrar en la paginación
  const getPaginationPages = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son menos que el máximo
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar un subconjunto de páginas con la actual en el centro cuando sea posible
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Ajustar el startPage si estamos cerca del final
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // Icono de ordenamiento
  const getSortIcon = (column: keyof T) => {
    if (!columns.find(col => col.key === column)?.sortable) return null;    
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 datatable-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 datatable-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    if (sortDirection === 'desc') {
      return (
        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 datatable-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }

    return null;
  };
  
  // Estilos para variantes de botones de acción
  const getActionButtonClass = (variant: string = 'secondary') => {
    const baseClass = 'inline-flex items-center px-2 py-1 text-xs font-medium rounded transition-colors border-0 bg-transparent';
    
    switch (variant) {
      case 'primary':
        return `${baseClass} text-blue-600 hover:text-blue-800 hover:bg-blue-50`;
      case 'danger':
        return `${baseClass} text-red-600 hover:text-red-800 hover:bg-red-50`;
      default:
        return `${baseClass} text-gray-600 hover:text-gray-800 hover:bg-gray-50`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Filas con datos reales */}
            {paginatedData.map((item, index) => {
              const itemId = getItemId(item);
              const isHighlighted = highlightedIds.includes(itemId);
              return (
                <tr 
                  key={index} 
                  className={`${isHighlighted 
                    ? 'bg-green-50 hover:bg-green-100 transition-colors duration-500 border-l-4 border-green-400' 
                    : 'hover:bg-gray-50'
                  }`}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render 
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || '')
                      }
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        {actions
                          .filter(action => !action.show || action.show(item))
                          .map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(item)}
                              className={getActionButtonClass(action.variant)}
                              title={action.label}
                              data-datatable-action="true"
                            >
                              {action.icon && <span className="mr-1 datatable-icon">{action.icon}</span>}
                              <span>{action.label}</span>
                            </button>
                          ))
                        }
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
            
            {/* Filas vacías para mantener una altura constante solo cuando hay múltiples páginas */}
            {totalPages > 1 && paginatedData.length < pageSize && Array(pageSize - paginatedData.length).fill(0).map((_, index) => (
              <tr key={`empty-${index}`} className="h-[53px]"> {/* Altura típica de una fila con padding */}
                {columns.map((_, colIndex) => (
                  <td key={`empty-${index}-col-${colIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Paginación y información de resultados */}
      {(data.length > 0 || totalPages > 1) && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          {/* Versión móvil */}
          <div className="flex flex-wrap gap-2 sm:hidden">
            {/* Información y controles principales */}
            <div className="flex justify-between items-center w-full">
              {totalPages > 1 ? (
                <div className="flex items-center">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-1 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <span className="px-2 text-sm text-gray-700">
                    {currentPage}/{totalPages}
                  </span>
                  
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-1 text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Mostrando {data.length} elementos</span>
                  </p>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                {totalPages > 1 && (
                  <>
                    <select
                      id="mobile-page-size"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      {pageSizeOptions.map(size => (
                        <option key={`mobile-${size}`} value={size}>
                          {size}/pág
                        </option>
                      ))}
                    </select>
                    
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value, 10);
                        if (!isNaN(page)) goToPage(page);
                      }}
                      className="w-12 px-2 py-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Versión desktop - Todo en una fila */}
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              {/* Navegación de páginas - solo mostrar si hay múltiples páginas */}
              {totalPages > 1 && (
                <nav className="inline-flex -space-x-px mr-4" aria-label="Pagination">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {getPaginationPages().map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              )}
              
              {/* Información de resultados y controles adicionales */}
              <div className={`flex items-center space-x-4 ${totalPages === 1 ? 'justify-center flex-grow' : 'flex-grow justify-end'}`}>
                {/* Información de resultados */}
                <p className="text-sm text-gray-700 whitespace-nowrap">
                  {totalPages > 1 ? (
                    <>
                      <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span>
                      -
                      <span className="font-medium">
                        {Math.min(currentPage * pageSize, data.length)}
                      </span>
                      <span> de </span>
                      <span className="font-medium">{data.length}</span>
                    </>
                  ) : (
                    <span className="font-medium">Mostrando {data.length} elementos</span>
                  )}
                </p>
                
                {/* Controles adicionales solo si hay múltiples páginas */}
                {totalPages > 1 && (
                  <>
                    {/* Ir a página específica */}
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-1">Ir a</span>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value, 10);
                          if (!isNaN(page)) goToPage(page);
                        }}
                        className="w-14 px-2 py-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    {/* Selector de elementos por página */}
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-1">Mostrar</span>
                      <select
                        id="page-size"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        {pageSizeOptions.map(size => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
