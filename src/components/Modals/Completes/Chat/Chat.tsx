import Portal from "../../Portal/Portal";
import Backdrop from "../../Backdrop";
import close from "../../../../assets/close.svg";
import IconField from "../../Authentification/IconField/IconField";
import send from "../../../../assets/send.svg";
import support from "../../../../assets/support.svg";
import { IModalProps } from "../../BaseModal/BaseModal";
import { FC } from "react";
import { Formik, Form } from "formik";
const initialValues = {
  message: "",
};

interface IChatProps extends IModalProps {}
const Chat: FC<IChatProps> = (props) => {
  return (
    <Portal>
      <Backdrop classNames="chat__backdrop">
        <div className="chat__header">
          <p className="title chat__title">Чат</p>
          <img
            src={close}
            alt="закрыть"
            className="icon"
            onClick={props.onClose}
          />
        </div>
        <div className="chat__body">
          <div className="wrapper">
            <img src={support} alt="профиль поддержки" className="user__icon" />
            <div className="chat__message">
              <p className="title_details">
                Здравствуйте. Как я могу помочь вам ? Здравствуйте. Как я могу
                помочь вам ? Здравствуйте. Как я могу помочь вам ? Здравствуйте.
                Как я могу помочь вам ?
              </p>
            </div>
          </div>
          <div className="wrapper wrapper_user">
            <img src={support} alt="профиль поддержки" className="user__icon" />
            <div className="chat__message chat__message_user">
              <p className="title_details">
                Здравствуйте. Как я могу помочь вам ? Здравствуйте. Как я могу
                помочь вам ? Здравствуйте. Как я могу помочь вам ? Здравствуйте.
                Как я могу помочь вам ?
              </p>
            </div>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {(formikProps) => (
            <Form className="form chat__input">
              <IconField id="message" icon={send} name="message">
                <textarea
                  name="message"
                  value={formikProps.values.message}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  className="textarea"
                  placeholder="Сообщение..."
                  id="message"
                ></textarea>
              </IconField>
            </Form>
          )}
        </Formik>
      </Backdrop>
    </Portal>
  );
};
export default Chat;
