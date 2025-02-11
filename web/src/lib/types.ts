export interface Artist {
    id: number;
    name: string;
    image: string;
    description: string;
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