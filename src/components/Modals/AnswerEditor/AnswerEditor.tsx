import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import back from "../../../assets/arrow-right.svg";
import question from "../../../assets/help-circle-black.svg";
import FormControls from "../FormControls";
import Backdrop from "../Backdrop";
import IconField from "../Authentification/IconField/IconField";
import { FC } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikPersist from "../FormikPersistence/FormikPersistence";
import { useAppDispatch } from "../../../wrappers/store-hooks";
import { change } from "../../../slices/modal/modal";

export type AnswerValues = {
  question_name: string;
  cover: string | null;
  type: boolean;
};

const initialValues: AnswerValues = {
  question_name: "",
  cover: null,
  type: false,
};

const schema = yup.object({
  question_name: yup
    .string()
    .required("Поле является обязательным")
    .max(255, "Длина ответа не должна превышать 255 символов"),
});

interface IAnswerEditorProps extends IModalProps {
  name: string;
  backPath: string;
}
const AnswerEditor: FC<IAnswerEditorProps> = (answerProps) => {
  const dispatch = useAppDispatch();
  const goToBackCard = () =>
    dispatch(
      change({
        current: "createCard",
        sessionData: answerProps.backPath,
      })
    );

  return (
    <BaseModal onClose={answerProps.onClose}>
      <Backdrop>
        <img
          className="icon modal__back"
          src={back}
          alt="Назад"
          onClick={goToBackCard}
        ></img>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={schema}
        >
          {(props) => (
            <Form className="form">
              <FormikPersist name={answerProps.name}></FormikPersist>
              <IconField
                name="question_name"
                icon={question}
                id="question_name"
                placeholder="Введите вопрос"
              ></IconField>
              <div className="wrapper wrapper_checkbox">
                <input
                  id="type"
                  type="checkbox"
                  onChange={props.handleChange}
                  name="type"
                  checked={props.values.type}
                  className="input switcher"
                ></input>
                <label htmlFor="type" className="label">
                  Правильный
                </label>
              </div>
              <FormControls
                inputName="cover"
                setImage={props.setFieldValue}
                selectedFile={props.values.cover}
                onReset={props.resetForm}
              ></FormControls>
            </Form>
          )}
        </Formik>
      </Backdrop>
    </BaseModal>
  );
};
export default AnswerEditor;
