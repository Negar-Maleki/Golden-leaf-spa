# 🌿 Golden Leaf Spa

A modern spa booking management system built with React and Node.js, featuring real-time booking management, service customization, and settings configuration.

## ✨ Features

- **Service Management**: Create, edit, and manage spa services with pricing and duration
- **Customer Management**: Track customer information and booking history
- **Booking System**: Handle appointments with real-time availability
- **Settings Dashboard**: Configure working days, hours, and pricing
- **Responsive UI**: Modern, clean interface built with styled-components

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Styled Components** - CSS-in-JS styling
- **Vite** - Build tool
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Negar-Maleki/Golden-leaf-spa.git
cd golden-leaf-spa
```

### 2. Backend Setup

```bash
cd back-end

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd front-end

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
golden-leaf-spa/
├── back-end/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── migrations/        # Migration history
│   │   ├── seed.js           # Seed script
│   │   └── data/             # Seed data files
│   ├── routes/               # API routes
│   ├── server/
│   │   └── index.js          # Express server
│   └── package.json
│
└── front-end/
    ├── src/
    │   ├── features/         # Feature modules
    │   │   ├── bookings/
    │   │   ├── services/
    │   │   └── settings/
    │   ├── ui/               # Reusable UI components
    │   ├── services/         # API services
    │   ├── pages/            # Page components
    │   └── utils/            # Utility functions
    └── package.json
```

## 🔑 Key Endpoints

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create a service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

## 🗄️ Database Schema

### Models
- **Service**: Spa services with pricing and duration
- **Customer**: Customer information
- **Booking**: Appointments linking customers and services
- **Settings**: Global application settings

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed the database
- `npx prisma studio` - Open Prisma Studio GUI

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

Custom reusable components include:
- Form elements (Input, Textarea, FileInput, Select)
- Buttons (primary, secondary, danger variations)
- Modals and confirmations
- Spinners and loaders
- Checkboxes and checkbox lists
- Data tables and filters

## 📝 License

ISC

## 👥 Author

Negar Maleki

---

Built with ❤️ for Golden Leaf Spa
