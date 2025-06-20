import express from 'express';
import cors from "cors";
import indexRouter from './routers/indexRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

export default app;