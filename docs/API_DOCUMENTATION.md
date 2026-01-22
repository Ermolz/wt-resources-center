# API Documentation

## Base URL
- REST API: `http://localhost:3000/api`
- GraphQL: `http://localhost:3000/graphql`

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-token>
```

## REST API Endpoints

### Authentication

#### 1. Register User
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Body** (JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**: 201 Created
- **Note**: Check server console for confirmation token (mock email mode)

#### 2. Confirm Email
- **Method**: `GET`
- **URL**: `/api/auth/confirm/:token`
- **Response**: 200 OK
- **Note**: Use token from server console after registration

#### 3. Login
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Body** (JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**: 200 OK
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "email": "user@example.com",
      "role": "USER"
    }
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### GPUs

#### 4. Get All GPUs
- **Method**: `GET`
- **URL**: `/api/gpus`
- **Query Parameters** (optional):
  - `chipsetId`: UUID
  - `vendorId`: UUID
  - `minMemory`: number
  - `maxMemory`: number
  - `minTdp`: number
  - `maxTdp`: number
  - `minPrice`: number
  - `maxPrice`: number
  - `status`: AVAILABLE | DISCONTINUED | COMING_SOON
  - `tagIds`: comma-separated UUIDs
  - `search`: string
  - `page`: number (default: 1)
  - `limit`: number (default: 20)
- **Response**: 200 OK with pagination
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z",
    "page": 1,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  }
}
```
- **Example**: `/api/gpus?minMemory=8&maxPrice=500&status=AVAILABLE&page=1&limit=20`

#### 5. Get GPU by ID
- **Method**: `GET`
- **URL**: `/api/gpus/:id`
- **Response**: 200 OK

#### 6. Create GPU (Admin Only)
- **Method**: `POST`
- **URL**: `/api/gpus`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON):
```json
{
  "name": "RTX 4090",
  "chipsetId": "uuid-here",
  "vendorId": "uuid-here",
  "memoryGB": 24,
  "memoryType": "GDDR6X",
  "tdp": 450,
  "price": 1599,
  "status": "AVAILABLE",
  "description": "High-end GPU",
  "tagIds": ["uuid1", "uuid2"]
}
```

#### 7. Update GPU (Admin Only)
- **Method**: `PUT`
- **URL**: `/api/gpus/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON): Same as create, all fields optional

#### 8. Delete GPU (Admin Only)
- **Method**: `DELETE`
- **URL**: `/api/gpus/:id`
- **Headers**: `Authorization: Bearer <token>`

#### 9. Toggle GPU Status (Admin Only)
- **Method**: `PATCH`
- **URL**: `/api/gpus/:id/toggle`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Toggles between AVAILABLE, DISCONTINUED, COMING_SOON

### Reference Data

#### 10. Get All Chipsets
- **Method**: `GET`
- **URL**: `/api/chipsets`
- **Response**: Array of chipsets

#### 11. Get All Vendors
- **Method**: `GET`
- **URL**: `/api/vendors`
- **Response**: Array of vendors

#### 12. Get All Tags
- **Method**: `GET`
- **URL**: `/api/tags`
- **Response**: Array of tags

## GraphQL API

### Endpoint
- **URL**: `http://localhost:3000/graphql`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (for protected operations)

### Queries

#### Get GPUs
```graphql
query GetGpus($filters: GpuFilters) {
  getGpus(filters: $filters) {
    id
    name
    chipset {
      id
      name
      manufacturer
    }
    vendor {
      id
      name
    }
    memoryGB
    memoryType
    tdp
    price
    status
    description
    tags {
      id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Variables**:
```json
{
  "filters": {
    "minMemory": 8,
    "maxPrice": 500,
    "status": "AVAILABLE"
  }
}
```

#### Get GPU by ID
```graphql
query GetGpu($id: ID!) {
  getGpu(id: $id) {
    id
    name
    chipset {
      id
      name
      manufacturer
    }
    vendor {
      id
      name
    }
    memoryGB
    memoryType
    tdp
    price
    status
    description
    tags {
      id
      name
    }
    createdAt
    updatedAt
  }
}
```

**Variables**:
```json
{
  "id": "gpu-uuid-here"
}
```

#### Get Reference Data
```graphql
query GetReferenceData {
  getChipsets {
    id
    name
    manufacturer
  }
  getVendors {
    id
    name
  }
  getTags {
    id
    name
  }
}
```

#### Get Current User
```graphql
query Me {
  me {
    id
    email
    role
    isActive
  }
}
```

### Mutations (Admin Only)

#### Create GPU
```graphql
mutation CreateGpu($input: CreateGpuInput!) {
  createGpu(input: $input) {
    id
    name
    status
    price
  }
}
```

**Variables**:
```json
{
  "input": {
    "name": "RTX 4090",
    "chipsetId": "uuid-here",
    "vendorId": "uuid-here",
    "memoryGB": 24,
    "memoryType": "GDDR6X",
    "tdp": 450,
    "price": 1599,
    "status": "AVAILABLE",
    "description": "High-end GPU",
    "tagIds": ["uuid1", "uuid2"]
  }
}
```

#### Update GPU
```graphql
mutation UpdateGpu($id: ID!, $input: UpdateGpuInput!) {
  updateGpu(id: $id, input: $input) {
    id
    name
    price
    status
  }
}
```

#### Delete GPU
```graphql
mutation DeleteGpu($id: ID!) {
  deleteGpu(id: $id)
}
```

#### Toggle GPU Status
```graphql
mutation ToggleGpuStatus($id: ID!) {
  toggleGpuStatus(id: $id) {
    id
    status
  }
}
```

## Socket.io Events

### Server Emits

The server emits real-time events when GPU data changes:

- **`gpu:created`** - Emitted when a new GPU is created
  ```json
  {
    "id": "...",
    "name": "RTX 4090",
    ...
  }
  ```

- **`gpu:updated`** - Emitted when a GPU is updated
  ```json
  {
    "id": "...",
    "name": "RTX 4090",
    ...
  }
  ```

- **`gpu:deleted`** - Emitted when a GPU is deleted
  ```json
  {
    "id": "..."
  }
  ```

- **`gpu:status-changed`** - Emitted when GPU status is toggled
  ```json
  {
    "id": "...",
    "status": "AVAILABLE"
  }
  ```

### Client Connection

Connect to Socket.io server:
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  path: '/socket.io'
});

socket.on('gpu:created', (gpu) => {
  console.log('New GPU created:', gpu);
});
```

## Postman Collection

A comprehensive Postman collection with tests is available at `docs/postman/GPU_Vault_API.postman_collection.json`. The collection includes:

- All REST and GraphQL endpoints
- Automatic token management
- Automatic variable extraction (gpuId, chipsetId, vendorId, tagIds)
- Comprehensive tests for each request:
  - Status code validation
  - Response structure validation
  - Data type validation
  - Response time checks
  - Field existence checks

### Using the Collection

1. Import the collection into Postman
2. Set the `baseUrl` variable (default: `http://localhost:3000`)
3. Run requests in order:
   - First: Get Reference Data (chipsets, vendors, tags) - IDs are auto-saved
   - Then: Login - token is auto-saved
   - Finally: Test GPU operations

The collection automatically saves IDs and tokens for use in subsequent requests.

## Testing Workflow

1. **Register a new user**:
   - POST `/api/auth/register`
   - Check server console for confirmation token

2. **Confirm email**:
   - GET `/api/auth/confirm/:token`

3. **Login**:
   - POST `/api/auth/login`
   - Save the token from response

4. **Get reference data** (chipsets, vendors, tags):
   - GET `/api/chipsets`
   - GET `/api/vendors`
   - GET `/api/tags`
   - Save UUIDs for creating GPUs

5. **Create admin user** (via database or Prisma Studio):
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

6. **Test protected endpoints**:
   - Use saved token in Authorization header
   - Test CRUD operations on GPUs

7. **Test GraphQL**:
   - Use GraphQL endpoint at `http://localhost:3000/graphql`
   - Include token in Authorization header for mutations
   - Use GraphQL Playground (available in browser)

## Response Format

All REST API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### Success Response with Pagination
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z",
    "page": 1,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation error",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "Authentication required"
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "ADMIN_ACCESS_REQUIRED",
    "message": "Admin access required"
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "GPU_NOT_FOUND",
    "message": "GPU not found"
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### 409 Conflict (Duplicate Entry)
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "Duplicate entry"
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error"
  },
  "meta": {
    "timestamp": "2026-01-22T12:30:00Z"
  }
}
```

## API Type Selection

The frontend supports switching between REST and GraphQL APIs through user settings. The API type preference is stored in localStorage and applied to all API calls automatically.

- **REST API**: Standard RESTful endpoints with JSON responses
- **GraphQL API**: Single endpoint with flexible queries and mutations

Both APIs provide the same functionality, allowing users to choose their preferred API style.

