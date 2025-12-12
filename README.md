# 🌿 Golden Leaf Spa- Admin UI

A modern spa booking management system built with React and Node.js, featuring real-time booking management, service customization, user authentication, and comprehensive settings configuration.

![Dashboard](images-goldenSpa/dashboard.JPG)

## ✨ Features

- **📊 Dashboard Analytics**: Real-time metrics for revenue, bookings, check-ins, and occupancy rates
- **🔐 Authentication System**: Secure login with JWT tokens and user profile management
- **💆 Service Management**: Create, edit, and manage spa services with pricing and duration
- **👥 Customer Management**: Track customer information and booking history
- **📅 Booking System**: Handle appointments with real-time availability and pricing calculation
- **⚙️ Settings Dashboard**: Configure working days, hours, and pricing for food/drinks
- **🌓 Dark Mode**: Toggle between light and dark themes for better user experience
- **📱 Responsive UI**: Modern, clean interface built with styled-components

## 📸 Screenshots

### Login & Authentication

Secure authentication system with traditional email/password login and Google OAuth integration. Users can sign in with their Google account for quick access, or create a local account with email and password.

![Login Screen](images-goldenSpa/login.JPG)

### Dashboard Overview

Admin can see an overview of events in the spa and different information about the business, including bookings, revenue, check-ins, and occupancy rate. Real-time analytics help track spa performance at a glance.

![Dashboard](images-goldenSpa/dashboard.JPG)

### Bookings Management

View all bookings with the ability to sort them based on price and date. Filter bookings by status (pending, confirmed, completed, cancelled). Access detailed views, delete bookings, or change their status. Booking details show comprehensive information for each reservation including customer info, service, pricing breakdown, and payment status.

![Bookings Table](images-goldenSpa/bookingsTable.JPG)
![Booking Details](images-goldenSpa/bookingsDetails.JPG)

### Services Management

Manage all spa services with sorting options based on price and alphabetically. Filter to show active or inactive services. Duplicate, delete, or edit each service with detailed pricing and duration settings.

![Services List](images-goldenSpa/services.JPG)
![Service Editing](images-goldenSpa/servicesEditing.JPG)

### User Management

Administrators can view all registered users, manage their profiles, and monitor user activity. Users can update their own profile information including name, avatar photo, and password through a secure form with real-time validation.

![Users](images-goldenSpa/users.JPG)
![Update User Profile](images-goldenSpa/updateUser.JPG)

### Settings

Configure global spa settings including opening and closing hours, food and drink pricing, and other operational parameters. Changes are applied system-wide and affect pricing calculations automatically.

![Settings Configuration](images-goldenSpa/setting.JPG)

### Dark Mode

Toggle between light and dark themes for comfortable viewing in any environment. The dark mode preference is saved and persists across sessions, with all UI components fully optimized for both themes.

![Dark Mode Theme](images-goldenSpa/darkMode.JPG)

## 🛠️ Tech Stack

### Frontend

- **React** - UI framework
- **React Router** - Navigation and routing
- **TanStack Query (React Query)** - Data fetching, caching, and state management
- **React Hook Form** - Form management and validation
- **Styled Components** - CSS-in-JS styling
- **Recharts** - Charts and data visualization
- **date-fns** - Date manipulation and formatting
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **React Error Boundary** - Error handling
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **Passport.js** - Authentication middleware (Local & Google OAuth)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

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
# Create a .env file with the following variables:
```

Create a `.env` file in the `back-end` directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:5000/api/login/auth/google/callback"
```

```bash
# Run migrations
npx prisma migrate dev

# Seed the database
npm run prisma:seed

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd front-end

# InAuthentication

- `POST /api/signup` - Register a new user
- `POST /api/login` - Login with email and password
- `POST /api/logout` - Logout user
- `GET /api/login/user` - Get current user (protected)
- `PUT /api/login/user` - Update user profile with avatar (protected)
- `GET /api/login/auth/google` - Initiate Google OAuth
- `GET /api/login/auth/google/callback` - Google OAuth callback

### Services (Protected)

- `GET /api/services` - Get all services
- `POST /api/services` - Create a service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

### Customers (Protected)

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

### Bookings (Protected)

- `GET /api/bookings` - Get all bookings
- `GET /api/bookings?last=7` - Get bookings from last N days
- `POST /api/bookings` - Create a booking with automatic price calculation
- `PUT /api/bookings/:id` - Update a booking
- `DUser**: User accounts with authentication (email, password hash, Google OAuth, role, avatar)
- **Service**: Spa services with pricing and duration
- **Customer**: Customer information and contact details
- **Booking**: Appointments linking customers and services with automatic price calculation
  - Includes `totalPrice` (service + extras)
  - `extraCost` (food + drink costs)
  - Status tracking (PENDING, CONFIRMED, COMPLETED, CANCELLED)
  - Payment tracking (`paid` boolean)
- **Settings**: Global application settings (opening/closing hours, food/drink pricing)
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings (opening hours, food/drink prices)
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

- **Form Elements**: Input, Textarea, FileInput, Select with validation
- **Buttons**: Primary, secondary, danger variations with loading states
- **Modals**: Confirmation dialogs and forms
- **Data Display**: Tables with sorting, filtering, and pagination
- **Charts**: Area charts (sales), Pie charts (duration distribution)
- **Stats**: Metric cards for dashboard analytics
- **Navigation**: Sidebar, header with user avatar
- **Error Handling**: Error boundary with fallback UI
- **Theme**: Dark mode toggle with context provider
- **Loaders**: Spinners and skeleton screens

## 🔒 Authentication & Security

- **JWT Tokens**: 7-day expiration with httpOnly cookies
- **Password Hashing**: bcrypt with salt rounds
- **OAuth Integration**: Google Sign-In support
- **Protected Routes**: Middleware-based authorization
- **Role-Based Access**: User and admin roles
- **File Upload Security**: Avatar uploads with multer validation

## 💰 Pricing System

The booking system automatically calculates total prices:
- Base service price
- Optional food cost (configurable in settings)
- Optional drink cost (configurable in settings)
- `totalPrice = servicePrice + (food ? foodPrice : 0) + (drink ? drinkPrice : 0)`
- Tracks `extraCost` separately for reporting

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
```
