import Backdrop from "../Backdrop";
import BaseModal from "../BaseModal/BaseModal";
import star from "../../../assets/black_star.svg";
import check from "../../../assets/black_check.svg";
import clock from "../../../assets/clock.svg";
import simple_check from "../../../assets/check.svg";
import { useAppSelector } from "../../../wrappers/store-hooks";
import "./MatchEnd.scss";
import { MatchEndsInfo } from "../../../Dtos/quizGame";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const MatchEnd = (props: { onClose: () => void }) => {
  const sessionData = useAppSelector((state) => state.modal.transferData);
  const matchInfo: MatchEndsInfo = useMemo(
    () => JSON.parse(sessionData) as MatchEndsInfo,
    [sessionData]
  );
  const navigate = useNavigate();
  const onAccept = () => {
    props.onClose();
    navigate("quizes");
  };
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <div className="match-end">
          <p className="title match-end__text">Результаты</p>
          <ul className="match-end__body">
            <li className="match-end__score">
              <img src={star} className="icon" />
              <div className="title_details match-end__text">
                Набрано <span>{matchInfo.score}</span> очков
              </div>
            </li>
            <li className="match-end__right-answers">
              <img src={check} className="icon" />
              <div className="title_details match-end__text">
                <span>{matchInfo.amountOfRightAnswers}</span> правильных ответов
              </div>
            </li>
            <li className="match-end__elapsed">
              <img src={clock} className="icon" />
              <div className="title_details match-end__text">
                Затрачено <span>{matchInfo.elapsed}</span>
              </div>
            </li>
          </ul>
          <button className="button match-end__button" onClick={onAccept}>
            <img src={simple_check} className="icon" />
            <span>Окей</span>
          </button>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default MatchEnd;
