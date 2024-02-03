import BaseModal, { IModalProps } from "../../BaseModal/BaseModal";
import Backdrop from "../../Backdrop";
import users from "../../../../assets/users.svg";
import user from "../../../../assets/user.svg";
import { FC } from "react";
import { setMode, change } from "../../../../slices/modal/modal";
import { useAppDispatch } from "../../../../wrappers/store-hooks";
import getParent from "../../../../wrappers/getParent";
interface IChooseRoomProps extends IModalProps {}
const ChooseRoom: FC<IChooseRoomProps> = (props) => {
  const dispatch = useAppDispatch();
  const onModeSetting = (e: React.MouseEvent) => {
    let button: HTMLButtonElement | null = e.target as HTMLButtonElement;
    if (button.nodeName !== "BUTTON")
      button = getParent(e.target, "BUTTON") as HTMLButtonElement;
    if (button !== null) {
      let mode = button.getAttribute("data-for");
      if (mode !== null) {
        dispatch(setMode(mode));
        if (mode === "multiple") dispatch(change({ current: "choosePlayers" }));
        else dispatch(change({ current: "" }));
      }
    }
  };
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <p className="title choose__title"> Выберите режим</p>
        <div className="choose__buttons">
          <button
            className="button choose__button button_wide button_fixed"
            data-for="multiple"
            onClick={onModeSetting}
          >
            <img src={users} alt="иконка" className="icon" />
            <span>Мультиплеер (50 в поиске)</span>
          </button>
          <button
            className="button choose__button button_wide"
            data-for="single"
            onClick={onModeSetting}
          >
            <img src={user} alt="иконка" className="icon" />
            <span>В одиночку</span>
          </button>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default ChooseRoom;
