import { AnsweredSurveys, NewSSurveyTemplate, SurveyTemplate } from "../types/types";
import answeredService from "../service/answeredService";
import { v4 as uuidv4 } from 'uuid';


const surveys: SurveyTemplate[] = [];

// Create a new survey entity. 'questions' field maybe empty,
// but title is required. Since ID is generated here,
// parameter type is NewSurvey, where 'id' is omitted.
const createSurvey = (survey: NewSSurveyTemplate) => {
    const newSurvey: SurveyTemplate = {
        ...survey,
        id: uuidv4(),
    }

    surveys.push(newSurvey);

    const newAnsweredSurveys: AnsweredSurveys = {
        templateId: newSurvey.id,
        finishedSurveys: []
    };
    answeredService.answers.push(newAnsweredSurveys);
};

const getSurveyById = (id: string): SurveyTemplate | undefined => {
    return surveys.find(x => x.id === id);
}


const getSurveys = (): SurveyTemplate[] => {
    return surveys;
}

const updateSurvey = (id: string, body: NewSSurveyTemplate) => {
    const existing = getSurveyById(id);
    if (!existing) {
        console.log("Survey does not exist")
        throw new Error("Survey does not exist");
    }

    const updatedSurvey: SurveyTemplate = {
        ...body,
        id: existing.id
    };

    const i = surveys.indexOf(existing);
    if (i === -1) {
        console.log("error while updating index");
        throw new Error("Error while updating index");
    }

    surveys[i] = updatedSurvey;
}


export default {
    createSurvey,
    getSurveys,
    updateSurvey,
}