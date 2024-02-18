import BaseModal from "../BaseModal/BaseModal";
import question from "../../../assets/help-circle-black.svg";
import back from "../../../assets/arrow-right.svg";
import Backdrop from "../Backdrop";
import FormControls from "../FormControls";
import IconField from "../Authentification/IconField/IconField";
import { IModalProps } from "../BaseModal/BaseModal";
import { useAppDispatch, useAppSelector } from "../../../wrappers/store-hooks";
import { change } from "../../../slices/modal/modal";

import { FC } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import FormikPersist from "../FormikPersistence/FormikPersistence";

export type CardValues = {
  question_name: string;
  answers: string[];
  cover: string | null;
};

const initialValues: CardValues = {
  question_name: "",
  answers: [],
  cover: null,
};

const schema = yup.object({
  question_name: yup.string().required("Поле является обязательным").max(255),
});

interface ICreateCard extends IModalProps {
  name: string;
}

const CreateCard: FC<ICreateCard> = (cardProps) => {
  const dispatch = useAppDispatch();
  const goBackToQuizCreation = () =>
    dispatch(change({ current: "createQuiz", sessionData: "createQuiz" }));
  const goToAnswer = (index: number) => {
    dispatch(
      change({
        current: "createAnswer",
        sessionData: `${cardProps.name}.createAnswer${index}`,
        backPath: cardProps.name,
      })
    );
  };

  return (
    <BaseModal onClose={cardProps.onClose}>
      <Backdrop>
        <img
          className="icon modal__back"
          src={back}
          alt="Назад"
          onClick={goBackToQuizCreation}
        ></img>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {}}
          validationSchema={schema}
        >
          {(props) => (
            <Form className="form">
              <FormikPersist name={cardProps.name}></FormikPersist>
              <IconField
                name="question_name"
                icon={question}
                id="question_name"
                placeholder="Введите вопрос"
              ></IconField>

              <FieldArray name="answers">
                {(arrayHelpers) => (
                  <>
                    <div className="create__cards input wrapper" role="group">
                      {props.values.answers.length !== 0 ? (
                        props.values.answers.map((item, i) => (
                          <div
                            className="create__cards-item button"
                            key={i}
                            onClick={() => goToAnswer(i)}
                          >
                            {i + 1}
                          </div>
                        ))
                      ) : (
                        <span className="title_details create-card__details">
                          Создайте первый ответ!
                        </span>
                      )}
                    </div>
                    <a
                      className="href create-card__href"
                      onClick={() =>
                        arrayHelpers.push(
                          `createAnswer${props.values.answers.length}`
                        )
                      }
                    >
                      Добавить вариант ответа
                    </a>
                  </>
                )}
              </FieldArray>

              <FormControls
                inputName="cover"
                setImage={props.setFieldValue}
                onReset={props.resetForm}
                selectedFile={props.values.cover}
              ></FormControls>
            </Form>
          )}
        </Formik>
      </Backdrop>
    </BaseModal>
  );
};
export default CreateCard;
