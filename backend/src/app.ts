import express, { Application } from "express";
import authRoutes from "./routes/auth";
import morgan from "morgan";//middleware
import "./database";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript

const app: Application = express();

// Settings
app.set('port', 3001);

// Middleware
app.use(morgan('dev'));// morgan : for more detail in console when route access
app.use(express.json());// for Posting a JSON

// Routes
app.use('/api', authRoutes);// go to /routes/auth.ts

// Swagger Documentation API
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));// go to /routes/auth.ts

export default app;