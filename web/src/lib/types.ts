export interface Artist {
  id: number;
  title: string;
  questions: {
      question: string;
      options: string[];
      custom_option: string;
  }[];
  ai_prompt_template: string;
  description?:string;
  image: string;
  }
  
  export interface Question {
    id: number;
    question: string;
    options: string[];
    allowCustom: boolean;
  }
  
  export interface ArtistQuestions {
    [key: string]: Question[];
  }