import BaseModal, { IModalProps } from "../BaseModal/BaseModal";
import Backdrop from "../Backdrop";
import lock from "../../../assets/lock.svg";
import support from "../../../assets/life-buoy.svg";
import userProfile from "../../../assets/user-profile.svg";
import "./UserProfile.scss";
import { FC } from "react";
interface IUserProfileProps extends IModalProps {}
const UserProfile: FC<IUserProfileProps> = (props) => {
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <div className="user-profile">
          <img
            src={userProfile}
            alt="Фото профиля"
            className="user-profile__image"
          />
          <p className="title_details user-profile__name">Peter Parker </p>
          <p className="title_details user-profile__details">
            peterParke@example.com
          </p>
          <div className="wrapper">
            <img src={lock} alt="сменить пароль" className="icon" />
            <p className="title_details user-profile__details">
              Сменить пароль
            </p>
          </div>
          <div className="wrapper">
            <img src={support} alt="поддержк" className="icon" />
            <p className="title_details user-profile__details">Поддержка</p>
          </div>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default UserProfile;
