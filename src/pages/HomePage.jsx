import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    minRating: '',
    year: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    applyFilters();
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filters, games]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://admin.edulatte.in/api/games');
      
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data = await response.json();
      
      if (data && data.data) {
        setGames(data.data);
        setFilteredGames(data.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...games];

    // Search by name
    if (filters.searchTerm) {
      filtered = filtered.filter(game =>
        game.attributes.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by minimum rating
    if (filters.minRating) {
      filtered = filtered.filter(game => {
        const rating = parseFloat(game.attributes.rating);
        return rating >= parseFloat(filters.minRating);
      });
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter(game => {
        const timestamp = parseInt(game.attributes.firstReleaseDate);
        const gameYear = new Date(timestamp).getFullYear();
        return gameYear === parseInt(filters.year);
      });
    }

    setFilteredGames(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      minRating: '',
      year: '',
    });
  };

  const handlePageChange = (page, newItemsPerPage) => {
    if (newItemsPerPage) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to first page when items per page changes
    } else {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGames = filteredGames.slice(startIndex, endIndex);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[var(--primary-card)] rounded-lg p-6 text-center">
          <p className="text-red-400 text-lg">Error: {error}</p>
          <button
            onClick={fetchGames}
            className="mt-4 px-6 py-2 bg-[var(--primary-blue)] text-[var(--text-primary)] rounded-md font-[var(--font-montserrat)] font-medium hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] font-[var(--font-montserrat)]">
            All Games
          </h2>
        </div>

        {filteredGames.length === 0 ? (
          <div className="bg-[var(--primary-card)] rounded-lg p-12 text-center">
            <p className="text-[var(--text-secondary)] text-lg">
              No games found matching your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredGames.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}