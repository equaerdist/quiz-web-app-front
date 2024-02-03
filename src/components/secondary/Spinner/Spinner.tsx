import "./Spinner.scss";
interface ISpinnerProps {
  classNames?: string;
}
const Spinner = (props: ISpinnerProps) => {
  const className = `spinner ${props.classNames ? props.classNames : ""}`;
  return (
    <svg className={className} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};
export default Spinner;
