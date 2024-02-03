import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import Backdrop from "../Backdrop";
/* import SignForm from "./SignForm/SignForm"; */
import EnterForm from "./EnterForm/EnterForm";
import { FC } from "react";
interface IAuthentificationProps extends IModalProps {}
const Authentification: FC<IAuthentificationProps> = (props) => {
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <div className="auth__tabs">
          <a href="#" className="auth__tab auth__tab_active">
            Sign in
          </a>
          <a href="#" className="auth__tab">
            ENTER
          </a>
        </div>
        <EnterForm></EnterForm>
      </Backdrop>
    </BaseModal>
  );
};
export default Authentification;
