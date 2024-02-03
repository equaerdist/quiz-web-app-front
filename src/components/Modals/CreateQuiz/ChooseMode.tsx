import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import Backdrop from "../Backdrop";
import crosshair from "../../../assets/crosshair.svg";
import slider from "../../../assets/sliders.svg";
import { FC } from "react";
interface IChooseModeProps extends IModalProps {}
const ChooseMode: FC<IChooseModeProps> = (props) => {
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <p className="title choose__title">Выберите режим</p>
        <div className="choose__buttons">
          <button className="button choose__button button_wide">
            <img src={crosshair} alt="иконка" className="icon" />
            <span>Автогенерация</span>
          </button>
          <button className="button choose__button button_wide">
            <img src={slider} alt="иконка" className="icon" />
            <span>Вручную</span>
          </button>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default ChooseMode;
