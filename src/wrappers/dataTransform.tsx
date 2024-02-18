import {
  CreateQuizCardDto,
  CreateQuizCardQuestionDto,
  CreateQuizDto,
  GetQuizDto,
  GetUserDto,
} from "../Dtos/Quiz";
import { AnswerValues } from "../components/Modals/AnswerEditor/AnswerEditor";
import { CardValues } from "../components/Modals/CreateCard/CreateCard";
import { QuizValues } from "../components/Modals/CreateQuiz/CreateQuiz";
import config from "./config";

export const getItemFromStorage = (item: string) => {
  console.log("start get item   ", item);
  let data = sessionStorage.getItem(`formik.form.${item}`);
  if (data) {
    console.log("get item", item);
    return JSON.parse(data);
  } else throw new Error("Empty element in array detected");
};
export const mapToQuestionToDto = (q: AnswerValues) => {
  console.log("start mapping question");
  let dto: CreateQuizCardQuestionDto = {
    content: q.question_name,
    thumbnail: q.cover,
    type: q.type,
  };
  console.log("end mapping question");
  return dto;
};
export const mapToCardDto = (c: CardValues) => {
  console.log("start mapping card", c);
  let dto: CreateQuizCardDto = {
    name: c.question_name,
    thumbnail: c.cover,
    questions: c.answers
      .map(getItemFromStorage)
      .map((item) => item.values)
      .map(mapToQuestionToDto),
  };
  console.log("end mapping card");
  return dto;
};
export const mapToQuizDto = (q: QuizValues) => {
  console.log("start mapping quiz");
  let cardsSamples = q.cards;
  let dto: CreateQuizDto = {
    name: q.title,
    award: parseInt(q.award),
    cards: q.cards
      .map(getItemFromStorage)
      .map((item) => item.values)
      .map((item, i) => {
        item.answers = item.answers.map(
          (answer: string) => `${cardsSamples[i]}.${answer}`
        );
        return item;
      })
      .map(mapToCardDto),
    thumbnail: q.cover,
    mode: 0,
  };
  console.log("end mapping quiz");
  return dto;
};

export const transformQuizes = (q: GetQuizDto) => {
  q.thumbnail = `${config.api}image/${q.thumbnail}`;
  return q;
};
export const transformGetUserDto = (user: GetUserDto) => {
  user.thumbnail = `${config.api}image/${user.thumbnail}`;
  return user;
};
