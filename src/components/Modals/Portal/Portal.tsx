import { createPortal } from "react-dom";
import { FC } from "react";
interface IPortalProps {
  children: React.ReactNode;
  destination?: HTMLElement;
}
const Portal: FC<IPortalProps> = (props) => {
  return createPortal(props.children, props.destination ?? document.body);
};
export default Portal;
