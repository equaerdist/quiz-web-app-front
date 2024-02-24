import Backdrop from "../Backdrop";
import BaseModal from "../BaseModal/BaseModal";
import cross from "../../../assets/cross3d.png";
import checker from "../../../assets/check3d.png";

import { useAppSelector } from "../../../wrappers/store-hooks";
import { ReactNode } from "react";

interface ICompleteProps {
  onClose: () => void;
  buttons?: ReactNode[];
}

const Complete = (props: ICompleteProps) => {
  const condition = useAppSelector((state) => state.modal.condition);
  const img = condition === "idle" ? checker : cross;
  const details = useAppSelector((state) => state.modal.details);
  const title = useAppSelector((state) => state.modal.transferData);
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <img src={img} alt="иконка" className="complete__icon" />
        {title === "" ? null : (
          <p className="title black complete__text">{title}</p>
        )}
        {details === "" ? null : (
          <p className="title_details black complete__text">{details}</p>
        )}
        <div className="buttons">{props.buttons ? props.buttons : null}</div>
      </Backdrop>
    </BaseModal>
  );
};
export default Complete;
