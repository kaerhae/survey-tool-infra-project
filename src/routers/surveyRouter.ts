import express from 'express';
import surveyService from '../service/surveyService';
const router = express.Router();

router.get("/", (_, res) => {
    const surveys = surveyService.getSurveys();
    res.status(200).json(surveys);
})

router.post("/", (req, res) => {
    surveyService.createSurvey(req.body);
    res.status(201).json({
        "status": 201,
        "message": `Survey titled "${req.body.title}" succesfully added`
    });
})

router.put("/", (req, res) => {
    surveyService.updateSurvey(req.body.id, req.body);
    res.status(204).json({
        "status": 201,
        "message": `Survey titled "${req.body.title}" succesfully added`
    });
})

export default router;