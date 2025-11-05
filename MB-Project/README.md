# MB Project

Detta projekt innehåller både frontend (React) och backend (Express).

## Grafisk profil

- **Färger**: Primär `#3b82f6` (blå), Sekundär `#22c55e` (grön), Bakgrund `#0f172a`, Yta `#111827`, Text `#e5e7eb`.

- **Typsnitt**: System Sans (`ui-sans-serif`, `Segoe UI`, `Roboto`, `Arial`).

- **Rubrikstorlek**: `h1` ≈ 1.6–2.2rem (fluid via `clamp()`), brödtext ≈ 1rem.

- **Designprinciper**: Minimalism, tydlig kontrast, responsiv layout (flex/grid), tillgängliga färger (AA-kontrast).

## Branchstruktur

- `main`: stabil kod (release/demo).

- `dev`: integrationsgren för pågående utveckling.

- `feature/*`: en funktion per branch, t.ex. `feature/frontend-bootstrap`, `feature/api-products`.

- Flöde: feature → PR till `dev` → PR till `main` vid demo.

## Projektstruktur

### Frontend (React)
- `src/App.jsx` - Huvudkomponenten som hanterar routing
- `src/components/Home.jsx` - Enkel landningssida
- `src/components/ContactUs.jsx` - Sida för CRUD-operationer (GET och POST)
- `src/components/About.jsx` - Informationssida
- `src/components/Navbar.jsx` - Navigationskomponent
- `src/styles/global.css` - Globala stilar med grafisk profil

### Backend (Express)
- `controllers/` - Controllers för olika resurser
  - `productController.js` - CRUD-operationer för produkter
  - `userController.js` - Användarrelaterade operationer
- `routes/` - API-routes
  - `productRoutes.js` - Routes för produkter
  - `userRoutes.js` - Routes för användare
- `models/` - Databasmodeller
  - `Product.js` - Produktmodell
  - `User.js` - Användarmodell
- `middleware/` - Middleware
  - `auth.js` - JWT-autentisering

## Installation

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Redigera .env med dina inställningar
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Kom igång

1. Starta MongoDB
2. Starta backend-servern (port 5000)
3. Starta frontend-applikationen (port 5173)

