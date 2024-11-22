import express from 'express';
import dotenv from 'dotenv';

const cors = require('cors');
dotenv.config();
const server = express();
server.use(express.json());

// Allow requests from frontend domain
server.use(cors({ origin: 'http://localhost:4200' }));

export default server;