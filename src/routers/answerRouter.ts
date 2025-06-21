import express from 'express';
import answerService from '../service/answeredService';
import { logError } from '../logger/logger';

const router = express.Router();


router.get("/:id", (req, res) => {
    const surveys = answerService.fetchFinishedSurveysById(req.params.id);
    if (!surveys) {
        const errMsg = `No surveys found by id: ${req.params.id}`
        logError(res, errMsg);
        res.status(404).json({
            "status": 404,
            "message": errMsg
        });
    }

    res.status(200).json(surveys);
})

router.post("/", (req, res) => {
    answerService.createAnsweredSurvey(req.body);
    res.status(201).json({
        "status": 201,
        "message": `Survey answers successfully added!`
    });
})


export default router;