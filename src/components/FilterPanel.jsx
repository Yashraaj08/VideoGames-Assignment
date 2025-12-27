import { useEffect, useState } from "react";

/**
 * FilterPanel
 * ------------
 * Responsible for handling all filter-related UI interactions:
 * - Debounced search input
 * - Rating filter
 * - Release year filter
 * - Clear filters action
 *
 * This component is intentionally kept stateless for actual filter values,
 * delegating filter state management to the parent via callbacks.
 */
export default function FilterPanel({ filters, onFilterChange, onClear }) {
  /**
   * Local state for search input.
   * This is decoupled from parent filters to enable:
   * - Debouncing
   * - Minimum character validation
   * - Reduced unnecessary filter updates / API calls
   */
  const [searchValue, setSearchValue] = useState(filters.searchTerm || '');

  /**
   * Debounce effect for search input.
   * - Waits 500ms after the user stops typing
   * - Triggers filter change only when:
   *   - search length >= 3 (valid search)
   *   - OR search is cleared (reset state)
   *
   * This pattern is critical in real-world apps to:
   * - Reduce API calls
   * - Improve performance
   * - Improve UX for fast typers
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.length >= 3 || searchValue.length === 0) {
        onFilterChange({
          ...filters,
          searchTerm: searchValue,
        });
      }
    }, 500);

    // Cleanup ensures that only the latest timeout executes
    return () => clearTimeout(handler);
  }, [searchValue]);

  /**
   * Generic input change handler.
   * - Search input is handled locally (debounced)
   * - Other filters update parent state immediately
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'searchTerm') {
      setSearchValue(value);
      return;
    }

    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  /**
   * Generate year list dynamically.
   * Avoids hardcoding and keeps the UI future-proof.
   */
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }

  return (
    <div className="rounded-lg py-5 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Search by name */}
        <div className="flex-1">
          <label
            htmlFor="searchTerm"
            className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
          >
            Search Games
          </label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search by game name..."
            className="w-full px-4 py-2.5 bg-[var(--primary-input)] text-[var(--text-primary)] rounded-md border border-transparent  focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)] focus:ring-opacity-50 transition-all font-[var(--font-mulish)] placeholder-[var(--text-secondary)] placeholder-opacity-50"
          />
        </div>

        {/* Filter by minimum rating */}
        <div className="flex-1 lg:max-w-xs">
          <label
            htmlFor="minRating"
            className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
          >
            Minimum Rating
          </label>
          <div className="relative w-full">
            <select
              id="minRating"
              name="minRating"
              value={filters.minRating}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 pr-10 bg-[var(--primary-input)] text-[var(--text-primary)] rounded-md border border-transparent focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)] focus:ring-opacity-50 transition-all font-[var(--font-mulish)] cursor-pointer appearance-none [-webkit-appearance:none] [-moz-appearance:none]"
            >
              <option value="">All Ratings</option>
              <option value="90">90+</option>
              <option value="80">80+</option>
              <option value="70">70+</option>
              <option value="60">60+</option>
              <option value="50">50+</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm">
              ▼
            </span>
          </div>

        </div>

        {/* Filter by year */}
        <div className="flex-1 lg:max-w-xs">
          <label
            htmlFor="year"
            className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
          >
            Release Year
          </label>
          <div className="relative w-full">
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 pr-10 bg-[var(--primary-input)] text-[var(--text-primary)] rounded-md border border-transparent focus:border-[var(--primary-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-blue)] focus:ring-opacity-50 transition-all font-[var(--font-mulish)] cursor-pointer appearance-none [-webkit-appearance:none] [-moz-appearance:none]"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm">
              ▼
            </span>
          </div>
        </div>

        {/* Clear button */}
        <div className="lg:max-w-xs">
          <button
            onClick={onClear}
            className="w-full px-4 py-3 bg-[var(--primary-input)] text-[var(--text-secondary)] rounded-md font-[var(--font-montserrat)] border border-transparent font-medium hover:bg-[var(--primary-end)] hover:text-[var(--text-primary)] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active filters indicator */}
      {(filters.searchTerm || filters.minRating || filters.year) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[var(--text-secondary)] text-sm font-[var(--font-mulish)]">Active filters:</span>
          {filters.searchTerm && (
            <span className="px-3 py-1 bg-[var(--primary-blue)]  text-[var(--text-primary)] text-sm rounded-full font-[var(--font-mulish)]">
              Search: {filters.searchTerm}
            </span>
          )}
          {filters.minRating && (
            <span className="px-3 py-1 bg-[var(--primary-blue)]  text-[var(--text-primary)] text-sm rounded-full font-[var(--font-mulish)]">
              Rating: {filters.minRating}+
            </span>
          )}
          {filters.year && (
            <span className="px-3 py-1 bg-[var(--primary-blue)]  text-[var(--text-primary)] text-sm rounded-full font-[var(--font-mulish)]">
              Year: {filters.year}
            </span>
          )}
        </div>
      )}
    </div>
  );
}