/**
 * GameCard
 * --------
 * Pure presentational component responsible for rendering
 * individual game information in a consistent card layout.
 */
export default function GameCard({ game }) {
  const { name, rating, summary, firstReleaseDate } = game.attributes;

  /**
   * Converts UNIX timestamp to human-readable date.
   * Isolated as a helper for readability and reusability.
   */
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Normalizes rating display.
   * Ensures consistent decimal formatting across the UI.
   */
  const formatRating = (rating) => {
    return parseFloat(rating).toFixed(1);
  };

  /**
   * Truncates long summaries to maintain
   * consistent card height and layout integrity.
   */
  const truncateSummary = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };
  
  return (
    <div className="bg-[var(--primary-card)] rounded-lg shadow-lg p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-montserrat)] line-clamp-2">
          {name}
        </h3>

        <span className="bg-[var(--primary-blue)] text-[var(--text-primary)] px-3 py-1 rounded-full text-sm font-semibold font-[var(--font-montserrat)]">
          {formatRating(rating)}
        </span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-3">
        Released: {formatDate(firstReleaseDate)}
      </p>

      <p className="text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
        {truncateSummary(summary)}
      </p>

      <button className="mt-4 bg-[var(--primary-blue)] text-[var(--text-primary)] rounded-md px-4 py-2 hover:bg-[var(--primary-blue)] transition-colors font-[var(--font-montserrat)] cursor-pointer hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">
        View Details
      </button>
    </div>

  );
}