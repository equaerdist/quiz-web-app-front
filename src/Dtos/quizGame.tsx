export enum MessageType {
  Succesfull,
  Error,
}

export enum NotifyType {
  Main,
  Submain,
}

export enum AdditionActions {
  None,
  ResetGroupInfo,
}

export interface GetQuizCardDto {
  id: string;
  name: string;
  thumbnail: string;
  questions: GetQuestionDto[];
}

export interface GetQuestionDto {
  id: string;
  content: string;
  thumbnail: string;
}

export interface Message {
  content: string;
  type: MessageType;
  notifyType: NotifyType;
  additionActions: AdditionActions;
}

export interface MatchStartsInfo {
  users: string[];
  quizId: string;
  competitiveType: CompetitiveType;
}

export enum CompetitiveType {
  Single,
  Multi,
}

export interface MatchEndsInfo {
  score: number;
  amountOfRightAnswers: number;
  elapsed: string;
}

export interface EnterQueueInfo {
  quizId: string;
  competitiveType: CompetitiveType;
  peopleAmount: number;
  withGroup: boolean;
}

export interface CheckAnswerInfo {
  answers: string[] | null;
}
export interface AnswerInfo {
  rightAnswers: string[];
  award: number;
  elapsed: string;
}
