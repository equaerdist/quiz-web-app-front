import BaseModal from "../../BaseModal/BaseModal";
import Backdrop from "../../Backdrop";
import check from "../../../../assets/check.svg";
import Cross from "../../../secondary/Cross/Cross";
import { IModalProps } from "../../BaseModal/BaseModal";
import { FC } from "react";
interface IConfirmProps extends IModalProps {}
const Confirm: FC<IConfirmProps> = (props) => {
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop classNames="confirm__backdrop">
        <p className="title_details confirm__details">
          Действительно хотите прервать прохождение? Весь ваш прогресс будет
          потерян.
        </p>
        <div className="confirm__buttons">
          <button className="button">
            <img src={check} alt="подтвердить" className="icon" />
            <span>Да</span>
          </button>
          <button className="button">
            <Cross classNames="confirm__cross"></Cross>
            <span>Нет</span>
          </button>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default Confirm;
