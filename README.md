# Food Ordering Platform

A full-stack food ordering app where you can browse items, manage your cart, and place orders. Built with React frontend and Node.js backend.

## Live Demo

- **Frontend:** [[Your Vercel URL](https://food-ordering-platform-frontend-black.vercel.app/)]
- **Backend:** https://food-ordering-platform-backend-production.up.railway.app

## What It Does

- **Browse Food Items** - View items organized by categories (Fruits, Vegetables, Breads, Non-Veg)
- **Shopping Cart** - Add items, adjust quantities, see total price
- **User Auth** - Register and login with email/password
- **Order History** - Track all your past orders
- **Mobile Responsive** - Works on phones, tablets, and desktops

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (fast dev server)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (API calls)

**Backend**
- Node.js + Express
- PostgreSQL (hosted on Neon)
- Prisma ORM
- JWT authentication
- bcrypt (password hashing)

## Quick Start

### Backend Setup

```bash
cd server
npm install

# Create .env file
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"

# Setup database
npx prisma migrate dev
npm run seed

# Start server
npm run dev
```

Runs on `http://localhost:8080`

### Frontend Setup

```bash
cd client
npm install

# Create .env file
VITE_API_URL="http://localhost:8080/api"

# Start dev server
npm run dev
```

Runs on `http://localhost:5173`

## Project Structure

```
Food-Order/
├── server/                 # Backend API
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Sample data
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth & error handling
│   │   ├── routes/        # API endpoints
│   │   └── index.ts       # Server entry
│   └── package.json
│
└── client/                # Frontend React app
    ├── src/
    │   ├── pages/         # Login, Home, Cart, Orders
    │   ├── components/    # Navbar
    │   ├── context/       # Auth state
    │   └── api/           # Axios config
    └── package.json
```

## Key Features

### Authentication
- JWT tokens with 1-day expiration
- Passwords hashed with bcrypt
- Protected routes redirect to login

### Cart System
- Add items with quantity selection
- Real-time total calculation
- Stock validation on checkout

### Orders
- Transaction-safe checkout (Prisma)
- Price snapshots (prices locked at order time)
- Stock automatically reduced
- Order history with status tracking

### Design
- Split-screen landing page
- Mobile hamburger menu
- Bottom-center toast notifications
- Custom orange color scheme

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Create account |
| `/api/auth/login` | POST | No | Login |
| `/api/categories` | GET | Yes | List categories |
| `/api/items` | GET | Yes | List all items |
| `/api/cart` | GET | Yes | View cart |
| `/api/cart` | POST | Yes | Add to cart |
| `/api/order/checkout` | POST | Yes | Create order |
| `/api/order/history` | GET | Yes | Past orders |

## Database Models

- **User** - email, password, cart, orders
- **Category** - name, items
- **Item** - name, price, stock, image, category
- **Cart** - user's shopping cart
- **CartItem** - items in cart with quantity
- **Order** - user orders with status
- **OrderItem** - items in order with price snapshot

## Deployment

**Backend (Railway)**
- Build command: `npm run build`
- Start command: `npm start`
- Add env vars: `DATABASE_URL`, `JWT_SECRET`

**Frontend (Vercel)**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add env var: `VITE_API_URL`

## Environment Variables

**Server (.env)**
```
DATABASE_URL="postgresql://..."
JWT_SECRET="random-secret-key"
PORT=8080
```

**Client (.env)**
```
VITE_API_URL="http://localhost:8080/api"
```

## Sample Data

Running `npm run seed` creates:
- 4 categories
- 8 food items (with real images)
- All items have stock and prices

## Notes

- Frontend uses localStorage for auth token
- CORS configured for localhost and Vercel domains
- Images from Unsplash (free to use)
- Mobile-first responsive design
- Toast notifications for user feedback

## License

ISC

---

Made with React, Express, and PostgreSQL