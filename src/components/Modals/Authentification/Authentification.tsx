import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import Backdrop from "../Backdrop";
import SignForm from "./SignForm/SignForm";
import EnterForm from "./EnterForm/EnterForm";
import { FC, useState } from "react";
interface IAuthentificationProps extends IModalProps {}
const Authentification: FC<IAuthentificationProps> = (props) => {
  const [mode, setMode] = useState("sign");
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <div className="auth__tabs">
          <a
            href="#"
            className={`auth__tab ${mode === "sign" ? "auth__tab_active" : ""}`}
            onClick={() => setMode("sign")}
          >
            Sign in
          </a>
          <a
            href="#"
            className={`auth__tab ${
              mode === "enter" ? "auth__tab_active" : ""
            }`}
            onClick={() => setMode("enter")}
          >
            ENTER
          </a>
        </div>
        {mode === "sign" ? <SignForm></SignForm> : <EnterForm></EnterForm>}
      </Backdrop>
    </BaseModal>
  );
};
export default Authentification;
