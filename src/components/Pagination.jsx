/**
 * Pagination
 * ----------
 * Handles navigation across paginated datasets.
 * Designed to scale for large result sets while maintaining usability.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) {

  /**
   * Generates page numbers dynamically.
   * Uses ellipsis (...) to avoid rendering excessive buttons.
   *
   * This logic mirrors patterns used in enterprise-grade UIs
   * (Google, GitHub, etc.)
   */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) endPage = 4;
      if (currentPage >= totalPages - 2) startPage = totalPages - 3;

      if (startPage > 2) pages.push('...');
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  /**
   * Navigation handlers are intentionally guarded
   * to prevent invalid page transitions.
   */
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  /**
   * Calculate the visible item range for UX clarity.
   * Example: "Showing 13–24 of 156 games"
   */
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Avoid rendering pagination UI if unnecessary
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--primary-card)] rounded-lg p-4 shadow-lg">
      {/* Items info */}
      <div className="text-[var(--text-secondary)] text-sm font-[var(--font-mulish)]">
        Showing <span className="font-semibold text-[var(--text-primary)]">{startItem}</span> to{' '}
        <span className="font-semibold text-[var(--text-primary)]">{endItem}</span> of{' '}
        <span className="font-semibold text-[var(--text-primary)]">{totalItems}</span> games
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-[var(--font-montserrat)] font-medium transition-all ${
            currentPage === 1
              ? 'text-[var(--primary-input)] text-[var(--text-secondary)] cursor-not-allowed opacity-50'
              : 'text-[var(--primary-input)] text-[var(--text-primary)] hover:bg-[var(--primary-blue)] hover:shadow-md'
          }`}
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
              className={`min-w-[40px] h-10 px-3 py-2 rounded-md font-[var(--font-montserrat)] font-medium transition-all ${
                page === currentPage
                  ? 'bg-[var(--primary-blue)] text-[var(--text-primary)] shadow-md scale-105'
                  : page === '...'
                  ? 'bg-transparent text-[var(--text-secondary)] cursor-default'
                  : 'text-[var(--primary-input)] text-[var(--text-primary)] hover:bg-[var(--primary-blue)] hover:shadow-md'
              }`}
              aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-[var(--font-montserrat)] font-medium transition-all ${
            currentPage === totalPages
              ? 'text-[var(--primary-input)] text-[var(--text-secondary)] cursor-not-allowed opacity-50'
              : 'text-[var(--primary-input)] text-[var(--text-primary)] hover:bg-[(var(--primary-blue)] hover:shadow-md'
          }`}
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
