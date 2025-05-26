import { useDebouncedSearch } from '../../hooks/useDebounce';

interface PostFilterProps {
  initialFilter: string;
  onFilterChange: (filter: string) => void;
  debounceDelay?: number;
}

/**
 * An enhanced filter component with debounced search for better performance
 * 
 * @param initialFilter - Initial filter value
 * @param onFilterChange - Callback when filter changes
 * @param debounceDelay - Optional delay for debouncing in milliseconds (default: 300ms)
 */
export const PostFilterWithDebounce: React.FC<PostFilterProps> = ({
  initialFilter,
  onFilterChange,
  debounceDelay = 300
}) => {
  // Use our custom debounced search hook
  const { value: filter, setValue: setFilter } = useDebouncedSearch(
    initialFilter,
    debounceDelay,
    onFilterChange // This will be called automatically when the debounced value changes
  );

  const handleClear = () => {
    setFilter('');
  };

  return (
    <div className="mb-3">
      <div className="flex">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name"
          aria-label="Filter posts by name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {filter && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Clear filter"
          >
            Clear
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1" aria-live="polite">
        {filter ? `Filtering posts by: ${filter}` : 'Showing all posts'}
      </p>
    </div>
  );
};
