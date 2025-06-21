import express from 'express';
import cors from "cors";
import prometheus from "prom-client";
import swagger from "swagger-ui-express";

import indexRouter from './routers/apiBasicRouter';
import surveyRouter from './routers/surveyRouter';
import answerRouter from './routers/answerRouter';
import { logRequest, logResponse } from './logger/logger';
import swaggerDocument from "../swagger/swagger.json"

const app = express();

const responseTimes = new prometheus.Histogram({
    name: "http_response_times",
    help: "Calculate response times",
    labelNames: ['endpoint'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

prometheus.collectDefaultMetrics();



app.use(express.json());
app.use(cors());
app.use("/swagger", swagger.serve)
app.get("/swagger", swagger.setup(swaggerDocument));
app.use((req, res, next) => {
    logRequest(req);
    res.on("finish", () => {
        const timer = responseTimes.startTimer();
        const elapsed = timer();
        logResponse(res, elapsed);
        responseTimes
            .labels(req.url)
            .observe(elapsed);
    });
    next();
});

app.use("/api/surveys", surveyRouter)
app.use("/api/answers", answerRouter);
app.get('/metrics', async (_, res) => {
  res.set('Content-Type', prometheus.register.contentType)
  res.send(await prometheus.register.metrics())
})
app.use("/", indexRouter);


export default app;