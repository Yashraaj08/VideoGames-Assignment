/**
 * LoadingSpinner
 * --------------
 * Centralized loading indicator component.
 * Used during data fetch operations to:
 * - Provide visual feedback
 * - Improve perceived performance
 * - Avoid blank screens
 */

export default function LoadingSpinner() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[var(--primary-input)] rounded-full"></div>
          <div className="w-20 h-20 border-4 border-[var(--primary-blue)] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-[var(--text-secondary)] text-lg font-[var(--font-mulish)]">
          Loading games...
        </p>
        <p className="mt-2 text-[var(--text-secondary)] text-sm font-[var(--font-mulish)] opacity-75">
          Please wait while we fetch the latest data
        </p>
      </div>
    </div>
  );
}
