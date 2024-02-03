import { FC } from "react";

interface IBackdropProps {
  children?: React.ReactNode;
  classNames?: string;
}
const Backdrop: FC<IBackdropProps> = (props) => {
  let classnamesValue = `modal__window ${props?.classNames}`;
  return <div className={classnamesValue}>{props?.children}</div>;
};
export default Backdrop;
