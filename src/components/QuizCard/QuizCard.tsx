import star from "../../assets/star.svg";
import play from "../../assets/play.svg";
import user from "../../assets/user.svg";
import rectangle from "../../assets/Rectangle.svg";
import question from "../../assets/help-circle.svg";
import { useAppDispatch } from "../../wrappers/store-hooks";
import { change } from "../../slices/modal/modal";
import { useState } from "react";
import Spinner from "../secondary/Spinner/Spinner";
import { setSelected } from "../../slices/quiz/quiz";

interface IQuizCardProps {
  title: string;
  questionsAmount: number;
  award: number;
  img: string;
  raiting: number;
  completed: number;
  id: string;
}
const QuizCard = (props: IQuizCardProps) => {
  const dispatch = useAppDispatch();
  const onStart = () => {
    dispatch(change({ current: "chooseRoom" }));
    dispatch(setSelected(props.id));
  };
  const { title, questionsAmount, award, img, raiting, completed } = props;
  const [image, setImage] = useState(img);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="card">
      <div className="card__cover">
        <span className="card__cover-score">+{award}</span>
        <span className="card__cover-questions-amount">
          <img src={question} alt="иконка знака вопроса" className="icon" />
          {questionsAmount}
        </span>
        <img
          src={image}
          alt="изображение карточки"
          className="card__img"
          onError={() => setImage(rectangle)}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <Spinner classNames="card__spinner"></Spinner>}
      </div>
      <p className=" title card__title">{title}</p>
      <div className="card__info">
        <div className="card__raiting">
          <span className="title_details card__details">{raiting}</span>
          <img src={star} alt="иконка звезды" className="icon star" />
        </div>
        <div className="card__stat">
          <div className="card__stat-numbers">
            <span className="title_details card__details">{completed}</span>
            <img src={user} alt="иконка пользователя" className="icon user" />
          </div>
          <span className="title_details card__details">Пройдено</span>
        </div>
      </div>
      <button className="button card__button" onClick={onStart}>
        <img src={play} alt="иконка для начала" className="icon" />
        Начать
      </button>
    </div>
  );
};
export default QuizCard;
