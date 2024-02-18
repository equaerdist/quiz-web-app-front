import { FC } from "react";
import { useField } from "formik";
interface IIconFieldProps {
  placeholder?: string;
  id: string;
  children?: React.ReactNode;
  icon?: string;
  alt?: string;
  type?: string;
  name: string;
  autocomplete?: string;
}

const IconField: FC<IIconFieldProps> = (props) => {
  const [field, meta] = useField(props);
  const { placeholder, id, icon, alt, type, children } = props;
  return (
    <>
      <div className="wrapper">
        <label htmlFor={`${id}`} className="label">
          <img src={icon} alt={alt ?? "иконка"} className="icon" />
        </label>
        {children ?? (
          <input
            autoComplete={props.autocomplete}
            {...field}
            type={type ?? "text"}
            className="input"
            placeholder={placeholder}
            id={id}
          />
        )}
      </div>
      {meta.error && meta.touched ? (
        <div className="title_details error">{meta.error}</div>
      ) : null}
    </>
  );
};
export default IconField;
