import IconField from "../IconField/IconField";
import dog from "../../../../assets/dog.svg";
import lock from "../../../../assets/lock.svg";
import enter from "../../../../assets/log-in.svg";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikPersist from "../../FormikPersistence/FormikPersistence";
import { UserDto } from "../../../../Dtos/Quiz";
import { useAppDispatch } from "../../../../wrappers/store-hooks";
import {
  fetchForGetUserData,
  fetchForUserEnter,
} from "../../../../slices/auth/auth";
type enterFormValues = {
  enter_login: string;
  enter_password: string;
};
const initialValues: enterFormValues = {
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
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: enterFormValues) => {
        let userDto: UserDto = {
          login: values.enter_login,
          password: values.enter_password,
        };
        return dispatch(fetchForUserEnter(userDto)).then(() =>
          dispatch(fetchForGetUserData())
        );
      }}
      validationSchema={schema}
    >
      {() => (
        <Form className="form">
          <FormikPersist name="enterForm"></FormikPersist>
          <IconField
            id="enter_login"
            icon={dog}
            type="email"
            placeholder="Email"
            autocomplete="email"
            name="enter_login"
          ></IconField>
          <IconField
            name="enter_password"
            id="enter__password"
            autocomplete="current-password"
            icon={lock}
            type="password"
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
