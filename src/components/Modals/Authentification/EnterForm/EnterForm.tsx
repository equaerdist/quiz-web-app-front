import IconField from "../IconField/IconField";
import dog from "../../../../assets/dog.svg";
import lock from "../../../../assets/lock.svg";
import enter from "../../../../assets/log-in.svg";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikPersist from "../../FormikPersistence/FormikPersistence";
const initialValues = {
  enter_login: "",
  enter_password: "",
};
const schema = yup.object({
  enter_login: yup
    .string()
    .required("Поле является обязательным")
    .email("Логин должен быть email"),
  enter_password: yup.string().required("Поле является обязательным"),
});
const EnterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={schema}
    >
      {() => (
        <Form className="form">
          <FormikPersist name="enterForm"></FormikPersist>
          <IconField
            id="enter_login"
            icon={dog}
            placeholder="Email"
            name="enter_login"
          ></IconField>
          <IconField
            name="enter_password"
            id="enter__password"
            icon={lock}
            placeholder="Пароль"
          ></IconField>
          <button className="button auth__button">
            <img src={enter} alt="иконка" className="icon" />
            <span>Вход</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default EnterForm;
