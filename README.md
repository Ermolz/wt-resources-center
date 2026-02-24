# GPU Vault

Full-stack web application for GPU encyclopedia and marketplace with admin panel, real-time updates, and comprehensive filtering capabilities.

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- REST API + GraphQL (Apollo Server)
- Socket.io for real-time updates
- JWT authentication
- Nodemailer (mock mode for development)

### Frontend
- React 19 + Vite
- Feature-Sliced Design (FSD) architecture
- Tailwind CSS
- Apollo Client for GraphQL
- Socket.io-client
- React Router
- Zod for validation

## Project Structure

```
ResourceCenter/
├── client/                 # React frontend
│   └── src/
│       ├── app/           # App initialization, providers
│       ├── pages/         # Page components
│       ├── widgets/       # Complex UI blocks
│       ├── features/      # Business logic features
│       ├── entities/      # Business entities (GPU, User, etc.)
│       └── shared/        # Shared utilities, UI components
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # REST controllers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # REST routes
│   │   ├── graphql/       # GraphQL schema and resolvers
│   │   ├── validators/    # Zod validation schemas
│   │   └── utils/         # Utility functions
│   └── prisma/            # Prisma schema and migrations
├── docs/                   # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── SETUP.md
│   ├── ARCHITECTURE.md
│   └── postman/            # Postman collection
│       └── GPU_Vault_API.postman_collection.json
├── docker-compose.yml      # PostgreSQL container
└── README.md              # This file
```

## Getting Started

See [Setup Guide](docs/SETUP.md) for detailed installation instructions.

### Quick Start

1. Clone the repository and install dependencies
2. Set up environment variables (see [Setup Guide](docs/SETUP.md))
3. Start PostgreSQL with Docker: `docker-compose up -d`
4. Run database migrations and seed: `cd server && npx prisma migrate dev && npm run prisma:seed`
5. Start backend: `cd server && npm run dev`
6. Start frontend: `cd client && npm run dev`

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- GraphQL: http://localhost:3000/graphql

## Database Schema

### Models
- **User**: Authentication and authorization
- **Gpu**: Main entity with GPU specifications
- **Chipset**: GPU chipset information (NVIDIA/AMD/Intel)
- **Vendor**: GPU vendor (ASUS, MSI, etc.)
- **Tag**: Tags for categorization (Gaming, Ray Tracing, etc.)

### Relationships
- Gpu belongs to Chipset and Vendor
- Gpu has many Tags (many-to-many)

## Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete REST and GraphQL API reference
- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration instructions
- **[Architecture Documentation](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[Postman Collection](docs/postman/GPU_Vault_API.postman_collection.json)** - Import this file into Postman to test all API endpoints with comprehensive tests

## Authentication

See [API Documentation](docs/API_DOCUMENTATION.md) for detailed authentication flow.

Default users (created by seed):
- **Admin**: `admin@gpuvault.com` / `admin123`
- **User**: `user@example.com` / `admin123`

## Features

### User Features
- Browse GPU catalog with advanced filtering
- Search by name
- Filter by chipset, vendor, memory, TDP, price, tags
- View detailed GPU information
- Real-time updates when admin makes changes
- User profile management
- Settings page with theme and language selection
- API type selection (REST/GraphQL)

### Admin Features
- Full CRUD operations for GPUs
- Toggle GPU status (Available/Discontinued/Coming Soon)
- Manage GPU tags
- Real-time updates broadcast to all clients
- Admin panel with responsive table/card view

### UI/UX Features
- Fully responsive design (mobile-friendly)
- Dark/Light theme support
- Internationalization (English/Ukrainian)
- Modern, clean interface with smooth animations
- Real-time updates via Socket.io

## CI

On every push and pull request to `master`/`main`, GitHub Actions runs:

- **Client**: install, lint, build
- **Server**: install, Prisma generate, entry-point check

No deployment; only build and lint verification.

### Common Commands

**Database:**
```bash
cd server
npx prisma migrate dev      # Run migrations
npx prisma studio          # Open Prisma Studio
npm run prisma:seed        # Seed database
```

**Backend:**
```bash
cd server
npm run dev                # Start development server
npm run build              # Build for production
npm start                  # Start production server
```

**Frontend:**
```bash
cd client
npm run dev                # Start development server
npm run build              # Build for production
npm run preview            # Preview production build
```

## Testing

Import the [Postman Collection](docs/postman/GPU_Vault_API.postman_collection.json) into Postman to test all API endpoints. The collection includes comprehensive tests for all requests.

See [API Documentation](docs/API_DOCUMENTATION.md) for complete API reference and testing workflow.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation on both client and server (Zod)
- SQL injection protection via Prisma ORM
- CORS configuration
- Role-based access control (admin/user)
- XSS protection
- Secure token storage in localStorage

## Architecture

### Frontend Architecture (Feature-Sliced Design)

```
client/src/
├── app/          # App initialization, providers, routing
├── pages/        # Page components (Home, Admin, Profile, etc.)
├── widgets/      # Complex UI blocks (GpuGrid, GpuFilters, AdminTable)
├── features/     # Business logic features (auth, gpu-create, gpu-edit)
├── entities/     # Business entities (gpu, chipset, vendor, tag)
└── shared/       # Shared utilities, UI components, libs
```

### Backend Architecture

```
server/src/
├── config/       # Configuration files (database, JWT, email)
├── controllers/  # REST controllers
├── services/     # Business logic layer
├── middleware/   # Express middleware (auth, validation, error handling)
├── routes/       # REST route definitions
├── graphql/      # GraphQL schema and resolvers
├── validators/   # Zod validation schemas
└── utils/        # Utility functions
```

## Tech Stack Details

### Backend
- **Runtime**: Node.js 20+ (see [.nvmrc](.nvmrc))
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **API**: REST + GraphQL (Apollo Server)
- **Real-time**: Socket.io
- **Authentication**: JWT
- **Validation**: Zod
- **Email**: Nodemailer (mock mode)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **GraphQL Client**: Apollo Client
- **HTTP Client**: Axios
- **Validation**: Zod
- **Architecture**: Feature-Sliced Design (FSD)

