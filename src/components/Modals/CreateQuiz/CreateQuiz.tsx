import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import back from "../../../assets/arrow-right.svg";
import plus from "../../../assets/plus.svg";
import info from "../../../assets/info.svg";
import text from "../../../assets/align-center.svg";
import Backdrop from "../Backdrop";
import FormControls from "../FormControls";
import IconField from "../Authentification/IconField/IconField";
import FormikPersist from "../FormikPersistence/FormikPersistence";
import { change, createQuizAsync } from "../../../slices/modal/modal";
import { useAppDispatch } from "../../../wrappers/store-hooks";

import { FC } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { goTo } from "../../../slices/transition/transition";
import { mapToQuizDto } from "../../../wrappers/dataTransform";

const schema = yup.object({
  title: yup
    .string()
    .required("Поле является обязательным")
    .min(4, "Название не может быть короче 4 символов")
    .max(145, "Название не может быть больше 145 символов"),
  award: yup
    .number()
    .typeError("Это должно быть число")
    .required("Поле является обязательным")
    .positive("Количество очков не может быть отрицательным или нулевым"),
  content: yup
    .string()
    .max(255, "Описание не должно превышать 255 символов")
    .min(10, "Описание не может быть короче 10 символов"),
});

interface ICreateQuizProps extends IModalProps {}

export type QuizValues = {
  title: string;
  award: string;
  content: string;
  cover: string | null;
  cards: string[];
};

const initialValues: QuizValues = {
  title: "",
  award: "",
  content: "",
  cover: null,
  cards: [],
};

const CreateQuiz: FC<ICreateQuizProps> = (props) => {
  const dispatch = useAppDispatch();
  const callTransition = () => {
    dispatch(goTo("start"));
    setTimeout(() => dispatch(goTo("")), 2500);
  };
  const goToCard = (index: number) => {
    dispatch(
      change({
        current: "createCard",
        sessionData: `createCard${index}`,
      })
    );
  };
  const handleSubmit = (values: QuizValues) => {
    console.log("he");
    let dto = mapToQuizDto(values);
    return dispatch(createQuizAsync(dto)).unwrap();
  };
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <img
          className="icon modal__back"
          src={back}
          alt="Назад"
          onClick={callTransition}
        ></img>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form className="form">
              <FormikPersist name="createQuiz"></FormikPersist>
              <IconField
                icon={info}
                id="title"
                placeholder="Название"
                name="title"
              ></IconField>
              <IconField
                name="award"
                icon={info}
                id="award"
                placeholder="Очки за прохождение"
              ></IconField>
              <div className="wrapper">
                <label htmlFor="description" className="label t-7">
                  <img src={text} alt="иконка" className="icon" />
                </label>
                <textarea
                  onChange={props.handleChange}
                  value={props.values.content}
                  onBlur={props.handleBlur}
                  placeholder="Описание"
                  name="content"
                  className="input textarea"
                  id="description"
                ></textarea>
              </div>
              {props.errors.content && props.touched.content ? (
                <div className="error">{props.errors.content}</div>
              ) : null}
              <div className="create__cards input wrapper">
                <div
                  className="create__cards-item button"
                  onClick={() =>
                    props.setFieldValue("cards", [
                      ...props.values.cards,
                      `createCard${props.values.cards.length}`,
                    ])
                  }
                >
                  <img src={plus} alt="добавить" className="icon" />
                </div>
                {props.values.cards.map((item, index) => (
                  <div
                    key={index}
                    className="create__cards-item button"
                    onClick={() => goToCard(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <FormControls
                onReset={() => {
                  props.resetForm();
                  sessionStorage.clear();
                }}
                inputName="cover"
                selectedFile={props.values.cover}
                setImage={props.setFieldValue}
              ></FormControls>
            </Form>
          )}
        </Formik>
      </Backdrop>
    </BaseModal>
  );
};
export default CreateQuiz;
