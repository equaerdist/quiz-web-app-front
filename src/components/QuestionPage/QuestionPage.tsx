import { useParams } from "react-router-dom";
import {
  CheckAnswerInfo,
  GetQuestionDto,
  GetQuizCardDto,
} from "../../Dtos/quizGame";
import rectangle from "../../assets/Rectangle.svg";
import key from "../../assets/key.svg";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "../../wrappers/store-hooks";
import ProgressBar from "../secondary/ProgressBar/ProgressBar";
import QuitQuiz from "../secondary/QuitQuiz/QuitQuiz";
import { useEffect, useRef, useState } from "react";
const QuestionPage = () => {
  const current = useRef<HTMLDivElement | null>(null);
  const connection = useAppSelector((state) => state.global.connection);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [counter, setCounter] = useState(0);
  const query = useQuery();
  const [currentQuiz, setCurrentQuiz] = useState<GetQuizCardDto | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const editAnswer = (type: boolean, id: string) => {
    if (type) setAnswers((answers) => [...answers, id]);
    else setAnswers((answers) => answers.filter((a) => a !== id));
  };
  const amountOfQuestion = parseInt(query.get("amountOfQuestion") ?? "0");
  useEffect(() => {
    connection?.invoke("SendAnswerToUser").then((card) => {
      setCurrentQuiz(card as GetQuizCardDto);
    });
  }, [counter]);
  const onAnswer = () => {
    var checkAnswerInfo: CheckAnswerInfo = { answers };
    connection?.invoke("CheckMyQuestion", checkAnswerInfo).then((result) => {});
  };
  return (
    <div className="question" ref={current}>
      <ProgressBar></ProgressBar>
      <QuitQuiz question={current.current as HTMLElement}></QuitQuiz>
      <div className="question__header">
        <img src={rectangle} alt="обложка" className="question__cover" />
        <p className="question__score">{currentQuiz?.award}</p>
      </div>
      <div className="question__body">
        <p className="question__general">{currentQuiz?.name}</p>
        <div className="question__variants">
          {currentQuiz?.questions.map((q) => (
            <Question question={q} EditAnswer={editAnswer}></Question>
          ))}
        </div>
        <button className="button" onClick={onAnswer}>
          <img src={key} alt="иконка" className="icon" />
          <span>Дать ответ</span>
        </button>
      </div>
    </div>
  );
};
const Question = (props: {
  question: GetQuestionDto;
  EditAnswer: Function;
}) => {
  return (
    <div className="question__variant" key={props.question.id}>
      <input
        type="checkbox"
        className="checkbox"
        onChange={(e) => props.EditAnswer(e.target.checked, props.question.id)}
      />
      <p className="question__details">{props.question.content}</p>
    </div>
  );
};
export default QuestionPage;
