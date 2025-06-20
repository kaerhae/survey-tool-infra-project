import express from 'express';
import answerService from '../service/answeredService';
import { logError, logRequest, logResponse } from '../logger/logger';

const router = express.Router();


router.get("/:id", (req, res) => {
    const receivedAt = Date.now();
    logRequest(req);
    const surveys = answerService.fetchFinishedSurveysById(req.params.id);
    if (!surveys) {
        const errMsg = `No surveys found by id: ${req.params.id}`
        logError(res, errMsg, receivedAt);
        res.status(404).json({
            "status": 404,
            "message": errMsg
        });
    }

    logResponse(res, receivedAt);
    res.status(200).json(surveys);
})

router.post("/", (req, res) => {
    const receivedAt = Date.now();
    logRequest(req);
    answerService.createAnsweredSurvey(req.body);
    logResponse(res, receivedAt);
    res.status(201).json({
        "status": 201,
        "message": `Survey answers successfully added!`
    });
})


export default router;