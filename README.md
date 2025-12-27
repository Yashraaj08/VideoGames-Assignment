# Video Games Assignment – React (Vite) Application

A modern, responsive **Single Page Application (SPA)** built with **React 19**, **Vite**, and **Tailwind CSS v4**, showcasing a curated list of video games fetched from an external API with advanced filtering and pagination.

---

## Features

* **Responsive UI** – Optimized for mobile, tablet, and desktop
* **Game Listing** – Displays 100+ video games from a live API
* **Advanced Filtering**
  * Search by game name
  * Filter by minimum rating
  * Filter by release year
* **Pagination** – Client-side pagination with configurable page size
* **Fast Performance** – Powered by Vite and modern React
* **Modern UI** – Gradient background, card-based layout, smooth animations
* **Multi-page App**
  * Home page (games listing)
  * Contact page (validated form with toast notifications)

---

## Technologies Used

### Core

* **React** `19.2.0` – UI library
* **React DOM** `19.2.0`
* **Vite** `7.2.4` – Fast development & build tool
* **React Router DOM** `7.11.0` – Client-side routing

### Styling

* **Tailwind CSS** `4.1.18` – Utility-first CSS
* **@tailwindcss/vite** – Tailwind integration for Vite
* **CSS Variables** – Theme customization via `:root`
* **Google Fonts** – Montserrat & Mulish

### UX

* **React Hot Toast** `2.6.0` – Toast notifications for form states

### Tooling

* **ESLint** – Code quality & linting
* **ESLint React Hooks / Refresh plugins**

---

## Design Specifications

### Colors

* **Background Gradient**: `#081221 → #03080f`
* **Card / Panel**: `#0e1a2b`
* **Input Fields**: `#182c47`
* **Primary Text**: `#ffffff`
* **Secondary Text**: `#c1d1e8`
* **Accent Blue**: `#5692e8`

### Typography

* **Headings / Buttons / Labels**: **Montserrat** (500–600)
* **Body Text**: **Mulish** (500)

---

## Installation & Setup

### Prerequisites

* **Node.js** v18+ (recommended)
* **npm**

### Steps

1. **Clone or extract the project**

   ```bash
   cd videogames-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

   *(Default Vite port)*

---

## Project Structure

```
videogames-assignmen/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── GameCard.jsx        # Individual game card
│   │   ├── FilterPanel.jsx     # Search & filters
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   └── Pagination.jsx      # Pagination controls
│   ├── pages/
│   │   ├── HomePage.jsx        # Games listing page
│   │   └── ContactPage.jsx     # Contact form page
│   ├── App.jsx                 # App layout & routes
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles & Tailwind import
├── index.html
├── package.json
├── vite.config.js
```

---

## API Integration

* **Endpoint**

  ```
  {{BASE_URL}}/api/games
  ```

* **Handled States**

  * Loading indicator
  * Error handling with retry
  * Client-side filtering & pagination

* **Implementation**

  * `fetch` API
  * `async/await`
  * Local state management with React hooks

---

## Filtering Logic

1. **Search by Name**
   * Case-insensitive
   * Real-time filtering
2. **Minimum Rating**
   * Numeric comparison (e.g. 70+, 80+, 90+)
3. **Release Year**
   * Derived from UNIX timestamp
4. **Clear Filters**
   * Resets without re-fetching data

---

## Responsive Breakpoints (Tailwind)

* **Mobile**: `< 640px`
* **Tablet**: `640px – 1024px`
* **Desktop**: `> 1024px`

---

## Performance Considerations

* Vite-powered fast HMR
* Client-side filtering for reduced API calls
* Reusable components
* CSS animations for subtle UX improvements
* Pagination to limit DOM rendering

---

## Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

---

## Future Enhancements

* Game detail page / modal
* Favorites / wishlist
* Sorting (rating, year, name)
* Server-side pagination
* Dark / light theme toggle
* Search history
* Export filtered results