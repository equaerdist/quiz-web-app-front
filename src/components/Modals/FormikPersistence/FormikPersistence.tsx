import { FormikConsumer, FormikErrors } from "formik";
import { FC, useEffect, useRef } from "react";
type StringHashMapType = { [key: string]: string };
interface IFormikPersistenceProps {
  name: string;
  values: StringHashMapType;
  errors: FormikErrors<any>;
  setValues: (values: StringHashMapType) => void;
  setErrors: (errors: StringHashMapType) => void;
}
const FormikPersistence: FC<IFormikPersistenceProps> = (props) => {
  const getKey = () => `formik.form.${props.name}`;
  const renderCount = useRef(0);
  useEffect(() => {
    if (renderCount.current > 1) {
      sessionStorage.setItem(
        getKey(),
        JSON.stringify({ values: props.values, errors: props.errors })
      );
    }
  }, [props.errors, props.values]);
  useEffect(() => {
    const { setErrors, setValues } = props;
    const data = sessionStorage.getItem(getKey());
    if (data) {
      const { values, errors } = JSON.parse(data);
      setValues(values);
      setErrors(errors);
    }
    renderCount.current += 1;
  }, []);

  return <></>;
};
const FormikPersist = ({ name }: { name: string }) => {
  return (
    <FormikConsumer>
      {({ setErrors, setValues, values, errors }) => (
        <FormikPersistence
          name={name}
          setErrors={setErrors}
          setValues={setValues}
          values={values}
          errors={errors}
        ></FormikPersistence>
      )}
    </FormikConsumer>
  );
};
export default FormikPersist;
