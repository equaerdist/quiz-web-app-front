import BaseModal from "../BaseModal/BaseModal";
import Backdrop from "../Backdrop";
import checker from "../../../assets/check-circle.svg";
import { IModalProps } from "../BaseModal/BaseModal";
import { FC } from "react";
interface IRegistrationEndProps extends IModalProps {}
const RegistrationEnd: FC<IRegistrationEndProps> = (props) => {
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <div className="auth__requirements wrapper">
          <img src={checker} alt="Иконка" className="icon registration__icon" />
          <span className="title_details registration__details">
            Все почти готово. Мы отправили письмо с подтверждением на вашу почту{" "}
            <span> Peterpark@example.com.</span>
          </span>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default RegistrationEnd;
