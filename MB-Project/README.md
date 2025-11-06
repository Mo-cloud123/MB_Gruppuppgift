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
- `src/App.jsx` - Huvudkomponenten som hanterar routing med React Router
- `src/components/Home.jsx` - Landningssida som visar produkter med köpfunktionalitet
- `src/components/Products.jsx` - Fullständig CRUD-hantering för produkter (Create, Read, Update, Delete)
- `src/components/ContactUs.jsx` - Kontaktformulär för att skicka meddelanden
- `src/components/About.jsx` - Informationssida om butiken
- `src/components/Navbar.jsx` - Navigationskomponent med länkar till alla sidor
- `src/components/Toast.jsx` - Toast-notifikationskomponent för användarfeedback
- `src/components/ConfirmModal.jsx` - Bekräftelsemodal för viktiga åtgärder (t.ex. borttagning)
- `src/styles/global.css` - Globala stilar med grafisk profil och CSS-variabler

### Backend (Express)
- `server.js` - Huvudserverfil som konfigurerar Express, MongoDB-anslutning och routes
- `controllers/` - Controllers för olika resurser
  - `productController.js` - Fullständig CRUD för produkter (GET, POST, PUT, DELETE)
  - `userController.js` - Användarrelaterade operationer
- `routes/` - API-routes
  - `productRoutes.js` - RESTful routes för produkter (`/api/products`)
  - `userRoutes.js` - Routes för användare
- `models/` - Mongoose databasmodeller
  - `Product.js` - Produktmodell med name och price
  - `User.js` - Användarmodell
- `middleware/` - Express middleware
  - `auth.js` - JWT-autentisering middleware
- `config/` - Konfigurationsfiler
  - `db.js` - Databaskonfiguration

## Installation

### Första gången
```bash
# Installera dependencies i root
npm install

# Installera dependencies i frontend
cd MB-Project/frontend
npm install

# Installera dependencies i backend
cd ../backend
npm install
```

### Konfiguration
1. Skapa en `.env`-fil i `MB-Project/backend/` med följande:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/mb_project
PORT=5000
```

2. Skapa en `.env`-fil i `MB-Project/frontend/` med följande (valfritt):
```env
VITE_API_URL=http://localhost:5000/api
```

## Kom igång

### Enkel start (rekommenderat)
Starta både frontend och backend samtidigt från root-mappen:
```bash
npm run dev
```
Detta startar:
- Backend på `http://localhost:5000`
- Frontend på `http://localhost:5173`

### Separata terminaler
Om du vill köra dem separat:

**Backend:**
```bash
cd MB-Project/backend
npm run dev
```

**Frontend:**
```bash
cd MB-Project/frontend
npm run dev
```

## Funktioner

### Produkter
- **Visa produkter** - Lista alla produkter på hem-sidan och produktsidan
- **Lägg till produkt** - Skapa nya produkter med namn och pris
- **Redigera produkt** - Uppdatera befintliga produkter
- **Ta bort produkt** - Radera produkter med bekräftelsemodal
- **Köp produkter** - Köpfunktionalitet på hem-sidan med bekräftelsemodal

### Användarupplevelse
- **Toast-notifikationer** - Smidiga meddelanden för framgång/error (försvinner automatiskt)
- **Bekräftelsemodaler** - Professionella modaler för viktiga åtgärder
- **Inline-validering** - Direkt feedback i formulär
- **Responsiv design** - Fungerar på alla enheter

## API Endpoints

### Produkter
- `GET /api/products` - Hämta alla produkter
- `GET /api/products/:id` - Hämta en produkt
- `POST /api/products` - Skapa ny produkt
- `PUT /api/products/:id` - Uppdatera produkt
- `DELETE /api/products/:id` - Radera produkt

