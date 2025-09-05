# Kan-Guroo

Kan-Guroo is a modern React/Vite application featuring a product catalog, cart, favorites, and authentication. The project uses Tailwind CSS, React Query, React Router, Axios, Zod, and other modern technologies.

## Features

- Product catalog with search, filters, and sorting
- Product detail page (dynamic routing)
- Cart and favorites management
- Authentication/registration (fake_token)
- Responsive design, burger menu, dark mode
- Form validation with Zod
- Asynchronous data fetching with React Query
- Axios instance and API abstraction
- Tailwind CSS styling
- All user-facing text is localized in Georgian

## Getting Started

### Requirements

- Node.js >= 18
- npm

### Installation

```bash
npm install
```

After installation, create a `.env` file in the project root and add:

```env
VITE_BASE_URL=https://dummyjson.com/products
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
public/                # Static files
src/
  api/                 # API abstraction (products, useProducts)
  assets/              # Images, logos
  components/          # UI components (Header, Cart, ProductCard ...)
  pages/               # Routing pages (Home, About, Contact, Favorites, ProductPage ...)
  stores/              # Zustand stores (cartStore, favoritesStore ...)
  types/               # Types
  utils/               # Axios instance, helpers
  index.css            # Tailwind CSS
  main.tsx             # Entry point
  App.tsx              # Routing and Providers
```

## Routing

- `/products` — Main page, product catalog
- `/products/:slug` — Product detail page
- `/favorites` — Favorites
- `/cart` — Cart
- `/about` — About company
- `/contact` — Contact page
- `/login` — Login
- `/register` — Registration

## Technologies

- React
- Vite
- React Router
- React Query
- Zustand
- Tailwind CSS
- Axios
- Zod
- react-hook-form
- react-icons

## Customization

- You can customize styles in `src/index.css` and `tailwind.config.js`
- API endpoints are defined in `src/utils/axiosInstance.ts`

## License

MIT

---

For additional questions or help, please visit the Contact page.
