import React, { useState } from "react";
import userImg from "../../assets/user-img.png";
import "./RoundedIcon.scss";
interface RoundedIconProps {
  children?: React.ReactNode;
  src?: string;
  onClick?: () => void;
  label?: iconExtension;
  style?: object;
}

type iconExtension = {
  tooltip: string;
  src: string;
};

const RoundedIcon = (props: RoundedIconProps) => {
  const [image, setImage] = useState(props.src ?? userImg);
  return (
    <div
      className="icon__wrapper"
      onClick={props.onClick ?? function () {}}
      style={props.style ?? {}}
    >
      {props.label ? (
        <img
          style={props.style ?? {}}
          src={props.label.src}
          className="icon label"
          title={props.label.tooltip}
        />
      ) : null}
      <img
        src={image}
        onError={() => setImage(userImg)}
        alt="динамическое изображение"
        className="icon"
      />
    </div>
  );
};
export default RoundedIcon;
