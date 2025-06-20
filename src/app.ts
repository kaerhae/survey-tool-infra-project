import express from 'express';
import cors from "cors";
import indexRouter from './routers/apiBasicRouter';
import surveyRouter from './routers/surveyRouter';
import answerRouter from './routers/answerRouter';


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/surveys", surveyRouter)
app.use("/api/answers", answerRouter);
app.use("/", indexRouter);

export default app;