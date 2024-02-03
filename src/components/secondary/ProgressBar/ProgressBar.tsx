import Portal from "../../Modals/Portal/Portal";
import "./ProgressBar.scss";
const ProgressBar = () => {
  return (
    <Portal>
      <div className="progress">
        <div className="progress__bar"></div>
        <p className="progress__details">67%</p>
      </div>
    </Portal>
  );
};
export default ProgressBar;
