import question from "../../assets/question.svg";
import play from "../../assets/play.svg";
import plus from "../../assets/plus.svg";
import { useAppDispatch } from "../../wrappers/store-hooks";
import { change } from "../../slices/modal/modal";
import { useNavigate } from "react-router-dom";
const PromoPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onQuizCreate = () => dispatch(change({ current: "createQuiz" }));
  const onStart = () => navigate("/quizes");
  return (
    <div className="promo">
      <div className="promo__left">
        <p className="title promo__title">
          Тренируйтесь на карточках квиз и становитесь лучше!
        </p>
        <p className="title_details promo__details">
          Выбирайте квиз по категории и нарешивайте карточки на скорость в
          мультирежиме или в одиночку. Получайте уникальные достижения и
          участвуйте в ежемесячном рейтинге, отслеживая свой персональный
          прогресс!
        </p>
        <div className="promo__buttons">
          <button className="button" onClick={onStart}>
            <img src={play} alt="иконка старта" className="icon" />
            Начать
          </button>
          <button className="button button_outlined" onClick={onQuizCreate}>
            <img src={plus} alt="иконка плюсика" className="icon" />
            Создать свой квиз
          </button>
        </div>
      </div>
      <div className="promo__right">
        <img src={question} className="promo__img"></img>
      </div>
    </div>
  );
};
export default PromoPage;
