import "./Cross.scss";
interface ICrossProps {
  children?: React.ReactNode;
  classNames?: string;
}
const Cross: React.FC<ICrossProps> = (props) => {
  return (
    <svg
      className={`cross ${props?.classNames}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <line className="horizontal" x1="0" y1="0" x2="50" y2="50" />
      <line className="vertical" x1="50" y1="0" x2="0" y2="50" />
    </svg>
  );
};
export default Cross;
