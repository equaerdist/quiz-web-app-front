export interface CreateQuizDto {
  name: string;
  mode: number;
  award: number;
  thumbnail: string | null;
  cards: CreateQuizCardDto[] | null;
}

export interface CreateQuizCardDto {
  name: string;
  thumbnail: string | null;
  questions: CreateQuizCardQuestionDto[] | null;
}
export interface CreateQuizCardQuestionDto {
  content: string;
  thumbnail: string | null;
  type: boolean;
}

export interface GetQuizDto {
  id: string;
  name: string;
  award: number;
  category: string;
  thumbnail: string;
  questionsAmount: number;
  completed: number;
  raiting: number;
}

export interface UserDto {
  login: string;
  password: string;
}

type Error = { detail: string };

export interface ProblemDetails {
  title: string;
  status: number;
  detail: string;
  errors?: Error[];
}
