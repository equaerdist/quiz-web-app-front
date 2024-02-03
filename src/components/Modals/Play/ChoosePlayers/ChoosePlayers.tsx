import BaseModal, { IModalProps } from "../../BaseModal/BaseModal";
import Backdrop from "../../Backdrop";
import { FC } from "react";
import { useAppDispatch } from "../../../../wrappers/store-hooks";
import { setPlayersAmount, change } from "../../../../slices/modal/modal";
import getParent from "../../../../wrappers/getParent";
interface IChoosePlayersProps extends IModalProps {}
const ChoosePlayers: FC<IChoosePlayersProps> = (props) => {
  const dispatch = useAppDispatch();
  const onPlayersSet = (e: React.MouseEvent) => {
    let button = e.target as HTMLButtonElement;
    if (button.nodeName !== "BUTTON")
      button = getParent(e.target, "BUTTON") as HTMLButtonElement;
    if (button === null) return;
    let mode = button.getAttribute("data-amount");
    if (mode === null) return;
    dispatch(setPlayersAmount(parseInt(mode)));
    dispatch(change({ current: "" }));
  };
  return (
    <BaseModal onClose={props.onClose}>
      <Backdrop>
        <p className="title choose__title">Выберите количество игроков</p>
        <div className="choose__buttons choose__buttons_players">
          <button
            className="button button_wide choose__button"
            data-amount="2"
            onClick={onPlayersSet}
          >
            <div className="wrapper">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <span>2</span>
          </button>
          <button
            className="button button_wide choose__button"
            data-amount="3"
            onClick={onPlayersSet}
          >
            <div className="wrapper">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <span>3</span>
          </button>
          <button
            className="button button_wide choose__button"
            data-amount="4"
            onClick={onPlayersSet}
          >
            <div className="wrapper">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <span>4</span>
          </button>
        </div>
      </Backdrop>
    </BaseModal>
  );
};
export default ChoosePlayers;
