import express from 'express';
import feedbackRoutes from './routes/feedbackRoutes';
import issueRoutes from './routes/issueRoutes';
import voteRoutes from './routes/voteRoutes';
import cors from 'cors';
const app = express();



const corsOptions = { 
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: '*',  
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}
app.use(cors(corsOptions)) 

// app.use(cors);

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/feedback', feedbackRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/votes', voteRoutes);

export default app;
