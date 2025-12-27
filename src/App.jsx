import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

/**
 * Navigation component
 * - Displays top navbar
 * - Highlights active route using `useLocation`
 */
function Navigation() {
  const location = useLocation(); // Get current route path

  return (
    <nav className="bg-[var(--primary-card)] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / App Title */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-semibold text-[var(--text-primary)] font-[var(--font-montserrat)]">
                Video Games
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium font-[var(--font-montserrat)] transition-colors ${
                location.pathname === '/'
                  ? 'bg-[var(--primary-blue)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md text-sm font-medium font-[var(--font-montserrat)] transition-colors ${
                location.pathname === '/contact'
                  ? 'bg-[var(--primary-blue)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Contact
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

/**
 * Main App component
 * - Wraps app with React Router
 * - Defines application routes
 * - Includes global toast notifications
 */
function App() {
  return (
    <Router>
      {/* Ensures full-height layout */}
      <div className="min-h-screen">
        <Navigation />

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Global toast notifications */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
