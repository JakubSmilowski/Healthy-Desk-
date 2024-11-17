import client from './config/database';
import server from './config/server';
import DeskController from './controllers/DeskControllers';
import deskRouter from './routes/DeskRoutes';
import { DeskApiService } from './services/DeskServices';

const port = process.env.PORT || 3000;

//server setup
server.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Connect to the database
client.connect()
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Database connection error:', err.stack));


// desk routes setup
server.use('/api', deskRouter)
