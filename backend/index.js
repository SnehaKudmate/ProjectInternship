const express = require('express');
const db = require('./config/db.js');
const productRoute = require('./routes/productRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const authRoute = require('./routes/authRoutes.js');


const cors = require('cors');
 const cookieParser = require('cookie-parser');


db();
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

server.use('/product/api', productRoute);
server.use('/user/api', userRoute);
server.use('/auth/api', authRoute);




// Error handling middleware
server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Custom error handling for invalid routes
server.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});
