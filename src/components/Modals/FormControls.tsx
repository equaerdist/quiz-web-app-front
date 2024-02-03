import check from "../../assets/check.svg";
import download from "../../assets/download.svg";
import { loadImageOnServerAsync } from "../../slices/modal/modal";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import { useRef } from "react";

interface IFormControlsProps {
  selectedFile?: string | null;
  onReset?: () => void;
  inputName: string;
  setImage: (name: string, filedValue: unknown, validate: boolean) => void;
}

const FormControls = (props: IFormControlsProps) => {
  const progress = useAppSelector((state) => state.modal.progress);
  const dispatch = useAppDispatch();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      dispatch(loadImageOnServerAsync(e.target.files[0]))
        .unwrap()
        .then((data) => props.setImage("cover", data, false));
    }
  };

  const fileUploader = useRef<HTMLInputElement | null>(null);

  const onImageLoad = () => {
    if (fileUploader.current != null) {
      fileUploader.current.click();
    }
  };
  let fileName = "";
  if (props.selectedFile) {
    if (props.selectedFile.length > 30)
      fileName = props.selectedFile.slice(0, 30) + "...";
    else fileName = props.selectedFile;
  }
  return (
    <>
      <input
        ref={fileUploader}
        type="file"
        className="hidden"
        name={props.inputName}
        onChange={handleImageUpload}
        accept=".jpg, .jpeg, .png, .gif"
      />
      <div className="wrapper">
        <button className="button" onClick={onImageLoad} type="button">
          <img src={download} alt="иконка" className="icon" />
          <span>Загрузить обложку</span>
        </button>
        <a className="href create__href">{fileName}</a>
      </div>
      {progress ? (
        <div className="progress">
          <div
            className="progress__bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : null}
      <div className="wrapper">
        <button className="button">
          <img src={check} alt="иконка" className="icon" />
          <span>Добавить</span>
        </button>
        <a
          className="href create__href"
          onClick={props.onReset ?? function () {}}
        >
          Сбросить
        </a>
      </div>
    </>
  );
};
export default FormControls;
