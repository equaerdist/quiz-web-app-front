import { FC, ReactNode } from "react";
import Portal from "../Portal/Portal";
export interface IModalProps {
  children?: ReactNode;
  onClose?: () => void;
}
const BaseModal: FC<IModalProps> = (props) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("modal")) if (props.onClose) props.onClose();
  };
  return (
    <Portal>
      <div className="modal" onClick={handleClose}>
        {props.children}
      </div>
    </Portal>
  );
};
export default BaseModal;
