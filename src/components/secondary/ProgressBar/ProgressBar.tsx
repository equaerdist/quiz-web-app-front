import Portal from "../../Modals/Portal/Portal";
const ProgressBar = (props: { value: number }) => {
  return (
    <Portal>
      <div className="progress-quiz">
        <div
          className="progress-quiz__bar"
          style={{ width: `${props.value}%` }}
        ></div>
        <p className="progress-quiz__details">{props.value}%</p>
      </div>
    </Portal>
  );
};
export default ProgressBar;
