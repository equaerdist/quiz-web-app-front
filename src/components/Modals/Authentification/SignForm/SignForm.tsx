import IconField from "../IconField/IconField";
import dog from "../../../../assets/dog.svg";
import lock from "../../../../assets/lock.svg";
import link from "../../../../assets/external-link.svg";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikPersist from "../../FormikPersistence/FormikPersistence";
const initialValues = { email: "", password: "", accept: false };
const schema = yup.object({
  email: yup
    .string()
    .email("Введите email, без его подтверждения вы не сможете зайти в систему")
    .required("Поле является обязательным"),
  password: yup
    .string()
    .required("Поле является обязательным")
    .max(255, "Пароль не может быть длиннее 255 символов"),
  accept: yup
    .boolean()
    .isTrue("Прочтите условия пользования")
    .required("Поле является обязательным"),
});
const SignForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={schema}
    >
      {(props) => (
        <Form className="form">
          <FormikPersist name="signForm"></FormikPersist>
          <IconField
            name="email"
            id="email"
            placeholder="Email"
            icon={dog}
          ></IconField>
          <IconField
            name="password"
            id="password"
            placeholder="Пароль"
            icon={lock}
          ></IconField>
          <IconField
            name="repassword"
            id="repassword"
            placeholder="Повторите пароль"
            icon={lock}
          ></IconField>
          <div className="auth__requirements">
            <input
              type="checkbox"
              className="checkbox"
              name="accept"
              checked={props.values.accept}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <span className="title_details auth__details">
              Я согласен с{" "}
              <a href="#" className="href auth__href">
                политикой кофиденциальности
              </a>
            </span>
          </div>
          {props.errors.accept && props.touched.accept ? (
            <div className="error">{props.errors.accept}</div>
          ) : null}
          <button className="button auth__button">
            <img src={link} alt="иконка" className="icon" />
            <span>Регистрация</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default SignForm;
