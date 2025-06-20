import { AnsweredSurveys, NewSingleAnsweredSurvey, SingleAnsweredSurvey } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


const answers: AnsweredSurveys[] = [];

const createAnsweredSurvey = (survey: NewSingleAnsweredSurvey) =>  {
    const existingTemplate = answers.find(x => x.templateId === survey.templateId);
    
    if (!existingTemplate) {
        throw new Error("No survey found with ID");
    }

    const newSurvey: SingleAnsweredSurvey = {
            ...survey,
            id: uuidv4(),
            answeredAt: new Date()
        }

    existingTemplate.finishedSurveys.push(newSurvey);

    const i = answers.indexOf(existingTemplate);
    answers[i] = existingTemplate;
};

const fetchFinishedSurveysById = (templateId: string): AnsweredSurveys | undefined => {
    const surveys = answers.find(x => x.templateId === templateId);
    if (!surveys) {
        return undefined;
    }

    return surveys;
}

export default {
    answers,
    createAnsweredSurvey,
    fetchFinishedSurveysById
}