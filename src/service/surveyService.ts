import { NewSurvey, Survey } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


const surveys: Survey[] = [];

// Create a new survey entity. 'questions' field maybe empty,
// but title is required. Since ID is generated here,
// parameter type is NewSurvey, where 'id' is omitted.
const createSurvey = (survey: NewSurvey) => {
    const newSurvey: Survey = {
        ...survey,
        id: uuidv4(),
    }

    surveys.push(newSurvey);
};

const getSurveyById = (id: string): Survey | undefined => {
    return surveys.find(x => x.id === id);
}


const getSurveys = (): Survey[] => {
    return surveys;
}

const updateSurvey = (id: string, body: NewSurvey) => {
    const existing = getSurveyById(id);
    if (!existing) {
        console.log("Survey does not exist")
        throw new Error("Survey does not exist");
    }

    const updatedSurvey: Survey = {
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
    updateSurvey
}