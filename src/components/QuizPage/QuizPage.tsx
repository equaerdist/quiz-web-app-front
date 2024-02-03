import QuizCard from "../QuizCard/QuizCard";
import { useEffect } from "react";
import arrow from "../../assets/arrow-down.svg";
import barChart from "../../assets/bar-chart.svg";
import user from "../../assets/user.svg";
import CreateQuizCard from "../QuizCard/CreateQuizCard";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import { getInitialQuizes, selectAll } from "../../slices/quiz/quiz";

const QuizPage = () => {
  const dispatch = useAppDispatch();
  const quizes = useAppSelector(selectAll);
  console.log(quizes);
  useEffect(() => {
    dispatch(getInitialQuizes());
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const sliderValue = event.target.value;
    const input = event.target;
    if (input !== null)
      input.style.background = `linear-gradient(to right, #2d0b7d ${sliderValue}%, var(--opacity_color) ${sliderValue}%)`;
  };
  return (
    <div className="quiz">
      <div className="quiz__parameters">
        <div className="quiz__sort">
          <span className="title_details">Сортировать по</span>
          <div className="quiz__sort-parameter">
            <img className="icon" src={arrow} alt="иконка стрелочки"></img>
            <select className="quiz__select">
              <option>Популярности</option>
              <option>Популярности</option>
              <option>Популярности</option>
            </select>
          </div>
        </div>
        <div className="quiz__raiting-progress">
          <span className="title_details">Рейтинг квиза</span>
          <input type="range" onChange={onChange}></input>
        </div>
        <div className="quiz__include-raiting-stats">
          <span className="title_details">Участие в рейтинге</span>
          <div className="quiz__sort-parameter">
            <img src={barChart} alt="иконка статистики" className="icon" />
            <span className="title_details">Да</span>
          </div>
        </div>
        <div className="quiz__prefer-interest">
          <span className="title_details">Учитывать мои интересы</span>
          <div className="quiz__sort-parameter">
            <img src={user} alt="иконка пользователя" className="icon" />
            <span className="title_details">Да</span>
          </div>
        </div>
      </div>
      <div className="quiz__cards">
        <CreateQuizCard></CreateQuizCard>
        {quizes.map((item) => (
          <QuizCard
            title={item.name}
            key={item.id}
            award={item.award}
            completed={item.completed}
            img={item.thumbnail}
            questionsAmount={item.questionsAmount}
            raiting={item.raiting}
          ></QuizCard>
        ))}
      </div>
    </div>
  );
};
export default QuizPage;
