import React from "react";
import Portal from "../../Modals/Portal/Portal";
import "./QuitQuiz.scss";
interface IQuitQuizProps {
  question: HTMLElement;
}
const QuitQuiz: React.FC<IQuitQuizProps> = (props) => {
  return (
    <Portal destination={props.question}>
      <div className="quit-quiz"></div>
    </Portal>
  );
};
export default QuitQuiz;
