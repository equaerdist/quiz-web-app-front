import Portal from "../../Modals/Portal/Portal";
const ProgressBar = (props: { value: number }) => {
  return (
    <Portal>
      <div className="progress progress_quiz">
        <div
          className="progress__bar"
          style={{ width: `${props.value}%` }}
        ></div>
        <p className="progress__details">{props.value}%</p>
      </div>
    </Portal>
  );
};
export default ProgressBar;
