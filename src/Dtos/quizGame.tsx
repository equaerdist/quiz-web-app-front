export enum MessageType {
  Succesfull,
  Error,
}

export enum NotifyType {
  Main,
  Submain,
  GameQueue,
}

export enum AdditionActions {
  None,
  ResetGroupInfo,
}

export interface Button {
  content: string;
  transferInfo: any;
  action: string | null;
}

export interface Message {
  content: string;
  type: MessageType;
  notifyType: NotifyType;
  additionActions: AdditionActions;
  buttons: Button[] | null;
}

export interface GetQuizCardDto {
  id: string;
  name: string;
  thumbnail: string;
  questions: GetQuestionDto[];
  award: number;
}

export interface GetQuestionDto {
  id: string;
  content: string;
  thumbnail: string;
}

export interface MatchStartsInfo {
  users: string[];
  quizId: string;
  competitiveType: CompetitiveType;
  amountOfQuestion: number;
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
