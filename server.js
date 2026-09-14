import express from 'express';
import './config/db.js';
import cors from 'cors';
import candidateRoutes from './router/candidateRoutes.js';
import voterRoutes from './router/voterRoutes.js';
import positionRoutes from './router/positionRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', voterRoutes);
app.use('/api', candidateRoutes)
app.use('/api', positionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});