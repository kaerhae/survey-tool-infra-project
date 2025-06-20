/*
*   
*   This section defines survey templates, which
*   can be created, read etc.
* 
*   These types are meant to be used as literal templates
*
*/
type BaseTemplate = {
    id: string;
    indexNumber: number;
    questionTitle: string;
    info: string;
}

type BaseChoiceTemplate = BaseTemplate & {
    
    predefinedOptions: string[];
}

enum FieldTypes {
    SingleChoice = 1,
    MultiChoice,
    TextBox,
    Rating,
}

type SingleChoiceTemplate = BaseChoiceTemplate & {
    fieldType: FieldTypes.SingleChoice;
    answeredOption?: string;
}

type MultiChoiceTemplate =  BaseChoiceTemplate & {
    fieldType: FieldTypes.MultiChoice;
    answeredOption?: string[];
}

type TextBoxTemplate = BaseTemplate & {
    fieldType: FieldTypes.TextBox;
    answerBox?: string;
}

type RatingTemplate = BaseTemplate & {
    fieldType: FieldTypes.Rating;
    rangeStart: number;
    rangeEnd: number;
    answeredRating?: number;
}

export type Template =
    | SingleChoiceTemplate
    | MultiChoiceTemplate
    | TextBoxTemplate
    | RatingTemplate;


export type SurveyTemplate = {
    id: string;
    title: string;
    questions?: Template[];
}


export type NewSSurveyTemplate = {
    title: string;
    questions?: Template[];
}

/* 
*
*   This section defines actual filled up surveys. These types inherit template
*   types, and add also answer fields to it.
*
*/

type SingleChoiceAnswers = SingleChoiceTemplate & {
    isRequired: boolean;
    answeredOption: string;
}

type MultiChoiceAnswers =  MultiChoiceTemplate & {
    isRequired: boolean;
    answeredOption: string[];
}

type TextBoxAnswers = TextBoxTemplate & {
    isRequired: boolean;
    answerBox: string;
}

type RatingAnswers = RatingTemplate & {
    isRequired: boolean;
    rangeStart: number;
    rangeEnd: number;
    answeredRating: number;
}

export type Answers =
    | SingleChoiceAnswers
    | MultiChoiceAnswers
    | TextBoxAnswers
    | RatingAnswers;

// Single answered survey, which has a foreign key to existing template
export type SingleAnsweredSurvey = {
    id: string;
    templateId: string;
    answeredAt: Date;
    answeredQuestions: Answers[]
}


// Single answered survey, which has a foreign key to existing template
export type NewSingleAnsweredSurvey = {
    templateId: string;
    answeredQuestions: Answers[]
}

// All answered surveys, which have a foreign key to existing template
export type AnsweredSurveys = {
    templateId: string;
    finishedSurveys: SingleAnsweredSurvey[];
}