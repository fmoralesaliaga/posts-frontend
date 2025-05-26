import { useState } from 'react';

interface PostFilterProps {
  initialFilter: string;
  onFilterChange: (filter: string) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({ initialFilter, onFilterChange }) => {
  const [filter, setFilter] = useState(initialFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filter);
  };

  const handleClear = () => {
    setFilter('');
    onFilterChange('');
  };
  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-none hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Buscar
        </button>

      </form>
    </div>
  );
};

export default PostFilter;
