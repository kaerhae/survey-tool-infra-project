
// 
// Basic inheritable types
// 
type BaseQuestion = {
    id: string;
    indexNumber: number;
    questionTitle: string;
    info: string;
}

type BaseChoiceQuestion = BaseQuestion & {
    
    predefinedOptions: string[];
}

enum FieldTypes {
    SingleChoice = 1,
    MultiChoice,
    TextBox,
    Rating,
}

// 
// Actual types
// 

type SingleChoiceQuestion = BaseChoiceQuestion & {
    fieldType: FieldTypes.SingleChoice;
    answeredOption: string;
}

type MultiChoiceQuestion =  BaseChoiceQuestion & {
    fieldType: FieldTypes.MultiChoice;
    answeredOption: string[];
}

type TextBoxQuestion = BaseQuestion & {
    fieldType: FieldTypes.TextBox;
    answerBox: string;
}

type RatingQuestion = BaseQuestion & {
    fieldType: FieldTypes.Rating;
    rangeStart: number;
    rangeEnd: number;
    answeredRating: number;
}

export type Question =
    | SingleChoiceQuestion
    | MultiChoiceQuestion
    | TextBoxQuestion
    | RatingQuestion;


export type Survey = {
    id: string;
    title: string;
    questions?: Question[];
}


export type NewSurvey = {
    title: string;
    questions?: Question[];
}