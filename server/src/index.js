require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { secret } = require('./config/jwt');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const errorHandler = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');
const gpuRoutes = require('./routes/gpu.routes');
const chipsetRoutes = require('./routes/chipset.routes');
const vendorRoutes = require('./routes/vendor.routes');
const tagRoutes = require('./routes/tag.routes');
const gpuService = require('./services/gpu.service');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
  path: process.env.SOCKET_IO_PATH || '/socket.io',
});

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const context = { io };
    if (token) {
      try {
        const user = jwt.verify(token, secret);
        context.user = user;
      } catch {
        void 0;
      }
    }
    return context;
  },
});

app.use('/api/auth', authRoutes);
app.use('/api/gpus', gpuRoutes);
app.use('/api/chipsets', chipsetRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/tags', tagRoutes);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.warn('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.warn('Client disconnected:', socket.id);
  });
});

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.warn(`Server running on http://localhost:${PORT}`);
    console.warn(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startServer().catch(console.error);

module.exports = { app, io, gpuService };

