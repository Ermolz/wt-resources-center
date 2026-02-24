# Setup Instructions

## Quick Start

1. **Create `.env` file in the `server/` directory:**
```env
# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gpuvault
DB_HOST=localhost
DB_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gpuvault?schema=public

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Email (Mock for development)
EMAIL_FROM=noreply@gpuvault.com

# Server
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Socket.io
SOCKET_IO_PATH=/socket.io
```

2. **Start Docker container:**
```bash
docker-compose up -d
```

3. **Setup database:**
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
```

This will create:
- **16 Chipsets**: RTX 4090, 4080, 4070, 4060, 3060, 3090, 3080, 3070 (NVIDIA); RX 7900 XTX/XT, 7800 XT, 7700 XT, 7600, 6900 XT (AMD); Arc A770, A750 (Intel)
- **12 Vendors**: ASUS, MSI, Gigabyte, EVGA, Zotac, PNY, Palit, Sapphire, PowerColor, XFX, ASRock, Inno3D
- **12 Tags**: Gaming, Ray Tracing, Workstation, Low Profile, Overclocked, RGB, Water Cooled, Budget, High-End, 4K Ready, VR Ready, Mining
- **96 GPUs**: 7-8 GPUs per vendor with realistic specifications, prices, and descriptions
- **Admin user**: `admin@gpuvault.com` / `admin123`
- **Test user**: `user@example.com` / `admin123`

4. **Install frontend dependencies:**
```bash
cd client
npm install
```

5. **Start servers:**

Backend (from `server/` directory):
```bash
npm run dev
```

Frontend (from `client/` directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- GraphQL: http://localhost:3000/graphql

## Seeding Database

After running migrations, seed the database with initial data:

```bash
cd server
npm run prisma:seed
```

This will populate the database with:
- **16 Chipsets**: RTX 4090, 4080, 4070, 4060, 3060, 3090, 3080, 3070 (NVIDIA); RX 7900 XTX/XT, 7800 XT, 7700 XT, 7600, 6900 XT (AMD); Arc A770, A750 (Intel)
- **12 Vendors**: ASUS, MSI, Gigabyte, EVGA, Zotac, PNY, Palit, Sapphire, PowerColor, XFX, ASRock, Inno3D
- **12 Tags**: Gaming, Ray Tracing, Workstation, Low Profile, Overclocked, RGB, Water Cooled, Budget, High-End, 4K Ready, VR Ready, Mining
- **96 GPUs**: 7-8 GPUs per vendor with realistic specifications, prices, and descriptions
- **Admin User**: `admin@gpuvault.com` / `admin123` (already active)
- **Test User**: `user@example.com` / `admin123` (already active)

## Resetting Database

To reset and reseed the database:

```bash
cd server
npx prisma migrate reset
npm run prisma:seed
```

## Viewing Data

Use Prisma Studio to view and edit data:

```bash
cd server
npx prisma studio
```

## Environment Variables

### Backend (server/.env)

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 7d)
- `PORT` - Server port (default: 3000)
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

Optional variables:
- `EMAIL_FROM` - Email sender address
- `SOCKET_IO_PATH` - Socket.io path (default: /socket.io)

### Frontend (.env in client/)

Optional variables:
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000/api)
- `VITE_GRAPHQL_URL` - GraphQL endpoint (default: http://localhost:3000/graphql)

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Check if Docker container is running:
```bash
docker ps
```

2. Check container logs:
```bash
docker logs gpu-vault-db
```

3. Restart container:
```bash
docker-compose restart
```

### Port Already in Use

If port 3000 or 5173 is already in use:

1. Change `PORT` in `server/.env`
2. Or stop the process using the port

### Prisma Issues

If Prisma commands fail:

1. Regenerate Prisma Client:
```bash
cd server
npx prisma generate
```

2. Reset database:
```bash
npx prisma migrate reset
npx prisma migrate dev
```

## Production Deployment

### Backend

1. Set `NODE_ENV=production` in `server/.env`
2. Build and start:
```bash
cd server
npm install --production
npm run build
npm start
```

### Frontend

1. Build for production:
```bash
cd client
npm install
npm run build
```

2. Serve the `dist` folder with a web server (nginx, Apache, etc.)

### Database

Use a managed PostgreSQL service (AWS RDS, Heroku Postgres, etc.) and update `DATABASE_URL` accordingly.

