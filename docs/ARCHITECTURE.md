# Architecture Documentation

## Overview

GPU Vault is a full-stack web application built with a modern tech stack, following best practices for scalability, maintainability, and developer experience.

## System Architecture

### Three-Tier Architecture

```
┌─────────────────┐
│   Presentation  │  React Frontend (Client)
│      Layer      │
└────────┬────────┘
         │ HTTP/WebSocket
┌────────▼────────┐
│  Application     │  Express.js + GraphQL
│      Layer      │
└────────┬────────┘
         │ SQL
┌────────▼────────┐
│     Data        │  PostgreSQL Database
│      Layer      │
└─────────────────┘
```

## Frontend Architecture

### Feature-Sliced Design (FSD)

The frontend follows Feature-Sliced Design methodology, organizing code into clear layers:

```
client/src/
├── app/              # Application initialization
│   ├── index.jsx     # Routes configuration
│   └── providers/    # Global providers (Router, Apollo, Theme, i18n, API Type)
├── pages/            # Page-level components
│   ├── home/         # Home page with GPU catalog
│   ├── admin/        # Admin panel
│   ├── profile/      # User profile
│   ├── settings/     # Application settings
│   ├── login/        # Login page
│   ├── register/     # Registration page
│   └── gpu-detail/   # GPU detail page
├── widgets/          # Complex UI blocks
│   ├── gpu-grid/     # GPU grid display
│   ├── gpu-filters/  # Filtering interface
│   └── admin-table/  # Admin table/card view
├── features/         # Business logic features
│   ├── auth/         # Authentication
│   ├── gpu-create/   # GPU creation form
│   └── gpu-edit/     # GPU editing form
├── entities/         # Business entities
│   ├── gpu/          # GPU entity (API, models)
│   ├── chipset/      # Chipset entity
│   ├── vendor/       # Vendor entity
│   └── tag/          # Tag entity
└── shared/           # Shared code
    ├── ui/           # Reusable UI components
    ├── lib/          # Libraries and utilities
    │   ├── api.js    # REST API client (Axios)
    │   ├── apollo.js # GraphQL client
    │   ├── api-type.jsx # API type context (REST/GraphQL)
    │   ├── theme.jsx # Theme context
    │   ├── i18n/     # Internationalization
    │   └── socket.jsx # Socket.io client
    └── config/       # Configuration
```

### Key Frontend Concepts

#### Path Aliases
All imports use path aliases for cleaner code:
- `@app` → `client/src/app`
- `@pages` → `client/src/pages`
- `@widgets` → `client/src/widgets`
- `@features` → `client/src/features`
- `@entities` → `client/src/entities`
- `@shared` → `client/src/shared`

#### State Management
- **React Context API** for global state (theme, i18n, API type)
- **Local State** with `useState` for component-specific state
- **Server State** via Apollo Client (GraphQL) or Axios (REST)

#### API Client Architecture
The application supports dynamic switching between REST and GraphQL:
- API type preference stored in `localStorage`
- Unified API interface - components don't need to know which API is used
- Automatic switching based on user preference

## Backend Architecture

### Layered Architecture

```
server/src/
├── config/           # Configuration
│   ├── database.js  # Prisma client
│   ├── jwt.js       # JWT configuration
│   └── email.js     # Email configuration
├── controllers/      # REST API controllers
│   ├── auth.controller.js
│   ├── gpu.controller.js
│   ├── chipset.controller.js
│   ├── vendor.controller.js
│   └── tag.controller.js
├── services/         # Business logic layer
│   ├── auth.service.js
│   ├── gpu.service.js
│   ├── chipset.service.js
│   ├── vendor.service.js
│   └── tag.service.js
├── middleware/       # Express middleware
│   ├── auth.middleware.js    # JWT authentication
│   ├── validate.middleware.js # Zod validation
│   └── error.middleware.js   # Error handling
├── routes/           # Route definitions
│   ├── auth.routes.js
│   ├── gpu.routes.js
│   ├── chipset.routes.js
│   ├── vendor.routes.js
│   └── tag.routes.js
├── graphql/          # GraphQL layer
│   ├── typeDefs.js   # GraphQL schema
│   └── resolvers.js  # GraphQL resolvers
├── validators/       # Validation schemas (Zod)
│   ├── auth.validator.js
│   └── gpu.validator.js
└── utils/            # Utility functions
    ├── response.js   # Standardized response helpers
    ├── token.js      # JWT utilities
    └── email.js      # Email utilities
```

### API Design

#### REST API
- RESTful endpoints following REST principles
- Standardized response format with `success`, `data`, `error`, `meta` fields
- Pagination support for list endpoints
- Query parameter filtering

#### GraphQL API
- Single endpoint: `/graphql`
- Type-safe schema with Prisma integration
- Flexible queries and mutations
- Same business logic as REST (shared services)

#### Real-time Updates
- Socket.io for real-time communication
- Events emitted on GPU CRUD operations
- Automatic client updates without page refresh

## Database Architecture

### Prisma ORM

```
prisma/
├── schema.prisma     # Database schema definition
├── migrations/       # Migration history
└── seed.js          # Database seeding script
```

### Entity Relationships

```
User (1) ──── (0..*) GPU (many-to-one) ──── Chipset
                                              Vendor
                                              Tag (many-to-many)
```

### Models

- **User**: Authentication, authorization, email confirmation
- **Gpu**: Main entity with specifications, pricing, status
- **Chipset**: GPU chipset (NVIDIA/AMD/Intel)
- **Vendor**: GPU manufacturer (ASUS, MSI, etc.)
- **Tag**: Categorization tags (Gaming, Ray Tracing, etc.)

## Data Flow

### REST API Request Flow

```
Client Request
    ↓
Express Router
    ↓
Authentication Middleware (if protected)
    ↓
Validation Middleware (Zod)
    ↓
Controller
    ↓
Service (Business Logic)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response (Standardized Format)
    ↓
Socket.io Broadcast (if applicable)
```

### GraphQL Request Flow

```
Client Query/Mutation
    ↓
Apollo Server
    ↓
Authentication (Context)
    ↓
Resolver
    ↓
Service (Business Logic)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response
    ↓
Socket.io Broadcast (if applicable)
```

## Security Architecture

### Authentication Flow

1. User registers → Password hashed with bcrypt
2. Email confirmation token generated (mock mode)
3. User confirms email → Account activated
4. User logs in → JWT token issued
5. Token stored in localStorage (client)
6. Token included in Authorization header (requests)

### Authorization

- **Role-based**: USER vs ADMIN
- **Middleware protection**: Routes protected with `authenticate` and `requireAdmin`
- **GraphQL protection**: Resolvers check user role

### Input Validation

- **Client-side**: Zod schemas in forms
- **Server-side**: Zod validation middleware
- **Database**: Prisma type safety

## Real-time Architecture

### Socket.io Integration

- Server emits events on GPU changes
- Clients subscribe to events
- Automatic UI updates without refresh
- Works with both REST and GraphQL operations

### Event Types

- `gpu:created` - New GPU added
- `gpu:updated` - GPU modified
- `gpu:deleted` - GPU removed
- `gpu:status-changed` - Status toggled

## API Type Selection

The frontend supports switching between REST and GraphQL:

1. User selects API type in Settings
2. Preference saved to `localStorage`
3. API clients check preference on each request
4. Same functionality, different transport layer

### Benefits

- **Flexibility**: Users can choose preferred API style
- **Learning**: Compare REST vs GraphQL implementations
- **Testing**: Test both APIs with same data

## Responsive Design

### Mobile-First Approach

- Tailwind CSS breakpoints:
  - `sm`: 640px (tablets)
  - `md`: 768px (small desktops)
  - `lg`: 1024px (desktops)
  - `xl`: 1280px (large desktops)

### Adaptive Components

- **Navbar**: Hamburger menu on mobile
- **AdminTable**: Table on desktop, cards on mobile
- **GpuGrid**: 1 column (mobile) → 2 (tablet) → 3 (desktop)
- **Forms**: Stacked on mobile, side-by-side on desktop

## Internationalization (i18n)

### Translation Structure

```
shared/lib/i18n/locales/
├── en/
│   ├── common.js
│   ├── profile.js
│   ├── settings.js
│   ├── catalog.js
│   └── index.js
└── uk/
    ├── common.js
    ├── profile.js
    ├── settings.js
    ├── catalog.js
    └── index.js
```

### Language Selection

- Stored in `localStorage`
- Applied to `document.documentElement.lang`
- Dynamic translation via `useI18n` hook

## Theme System

### Implementation

- **Context-based**: `ThemeProvider` manages theme state
- **localStorage persistence**: Theme preference saved
- **Tailwind integration**: `darkMode: 'class'` configuration
- **Smooth transitions**: CSS transitions for theme changes

### Theme Toggle

- Light/Dark mode switch
- Automatic system preference detection
- Persistent across sessions

## Development Workflow

### Code Organization

1. **Entities**: Define data models and API clients
2. **Features**: Implement business logic features
3. **Widgets**: Build complex UI components
4. **Pages**: Compose pages from widgets and features
5. **Shared**: Reusable utilities and components

### Best Practices

- **Separation of Concerns**: Clear layer boundaries
- **DRY Principle**: Shared utilities and components
- **Type Safety**: Zod validation, Prisma types
- **Error Handling**: Centralized error middleware
- **Code Reusability**: Feature-Sliced Design principles

## Deployment Architecture

### Development

- **Backend**: Node.js dev server with hot reload
- **Frontend**: Vite dev server with HMR
- **Database**: Docker PostgreSQL container

### Production

- **Backend**: Built Node.js application
- **Frontend**: Static build served by web server
- **Database**: Managed PostgreSQL service
- **Environment**: Production environment variables

## Performance Considerations

### Frontend

- **Code Splitting**: React Router lazy loading
- **Optimistic Updates**: Socket.io real-time updates
- **Caching**: Apollo Client cache, localStorage
- **Bundle Size**: Tree-shaking, path aliases

### Backend

- **Database Indexing**: Prisma indexes on foreign keys
- **Query Optimization**: Prisma query optimization
- **Pagination**: Limit data transfer
- **Connection Pooling**: Prisma connection pool

## Scalability

### Horizontal Scaling

- **Stateless API**: JWT tokens, no server-side sessions
- **Database**: PostgreSQL can be scaled/replicated
- **Load Balancing**: Multiple API instances possible

### Vertical Scaling

- **Connection Pooling**: Prisma connection management
- **Caching**: Apollo Client cache, future Redis integration
- **Database Optimization**: Indexes, query optimization

