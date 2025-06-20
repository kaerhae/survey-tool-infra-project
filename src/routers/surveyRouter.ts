import express from 'express';
import surveyService from '../service/surveyService';
import { logRequest, logResponse } from '../logger/logger';
const router = express.Router();

router.get("/", (req, res) => {
    const receivedAt = Date.now();
    logRequest(req);
    const surveys = surveyService.getSurveys();
    logResponse(res, receivedAt);
    res.status(200).json(surveys);
})

router.post("/", (req, res) => {
    logRequest(req);
    const receivedAt = Date.now();
    surveyService.createSurvey(req.body);
    logResponse(res, receivedAt);
    res.status(201).json({
        "status": 201,
        "message": `Survey titled "${req.body.title}" succesfully added`
    });
})

router.put("/", (req, res) => {
    logRequest(req);
    const receivedAt = Date.now();
    surveyService.updateSurvey(req.body.id, req.body);
    logResponse(res, receivedAt);
    res.status(204).json({
        "status": 201,
        "message": `Survey titled "${req.body.title}" succesfully added`
    });
})

export default router;