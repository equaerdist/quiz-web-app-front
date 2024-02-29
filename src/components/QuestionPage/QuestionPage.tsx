import { useParams } from "react-router-dom";
import {
  AnswerInfo,
  CheckAnswerInfo,
  GetQuestionDto,
  GetQuizCardDto,
  MatchEndsInfo,
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
import { change } from "../../slices/modal/modal";
const QuestionPage = () => {
  const query = useQuery();
  const { id } = useParams();
  const startInfo = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const amountOfQuestion = parseInt(query.get("amountOfQuestions") ?? "0");

  const current = useRef<HTMLDivElement | null>(null);
  const connection = useAppSelector((state) => state.global.connection);

  const [counter, setCounter] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState<GetQuizCardDto | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerResult, setAnswerResult] = useState<AnswerInfo | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("fair");
    if (counter == 1 && !startInfo.current) startInfo.current = true;
    else {
      console.log("fair");
      if (counter <= amountOfQuestion)
        connection?.invoke("SendAnswerToUser").then((card) => {
          setCurrentQuiz(card as GetQuizCardDto);
          console.log(card);
        });
      let progress = Math.round(((counter - 1) / amountOfQuestion) * 100);
      setProgress(progress);
    }
  }, [counter]);

  const editAnswer = (type: boolean, id: string) => {
    if (type) setAnswers((answers) => [...answers, id]);
    else setAnswers((answers) => answers.filter((a) => a !== id));
  };
  const checkCorrect = (questionId: string) => {
    if (answerResult == null) return null;
    if (answerResult.rightAnswers.includes(questionId)) return true;
    else if (answers.includes(questionId)) return false;
    return null;
  };
  const onAnswer = () => {
    var checkAnswerInfo: CheckAnswerInfo = { answers };
    connection?.invoke("CheckMyQuestion", checkAnswerInfo).then((result) => {
      setAnswerResult(result);
      setTimeout(() => {
        if (counter == amountOfQuestion) {
          connection
            .invoke("GetInformationAboutQuizCompletion", id)
            .then((info: MatchEndsInfo) => {
              dispatch(
                change({
                  current: "matchEnd",
                  sessionData: JSON.stringify(info),
                })
              );
            });
          setCounter((counter) => counter + 1);
        } else {
          setCounter((counter) => counter + 1);
          setAnswerResult(null);
          setAnswers([]);
        }
      }, 2000);
    });
  };

  return (
    <div className="question" ref={current}>
      <ProgressBar value={progress}></ProgressBar>

      <div className="question__header">
        <QuitQuiz></QuitQuiz>
        <img src={rectangle} alt="обложка" className="question__cover" />
        <p className="question__score">{currentQuiz?.award}</p>
      </div>
      <div className="question__body">
        <p className="question__general">{currentQuiz?.name}</p>
        <div className="question__variants">
          {currentQuiz?.questions.map((q) => (
            <Question
              question={q}
              EditAnswer={editAnswer}
              type={checkCorrect(q.id)}
            ></Question>
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
  type?: boolean | null;
}) => {
  var className = `question__variant ${
    props.type
      ? `question__variant_right`
      : props.type == false
      ? "question__variant_wrong"
      : ""
  }`;
  return (
    <div className={className} key={props.question.id}>
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
