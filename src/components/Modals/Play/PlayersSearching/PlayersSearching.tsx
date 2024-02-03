import Backdrop from "../../Backdrop";
import Spinner from "../../../secondary/Spinner/Spinner";
import Portal from "../../Portal/Portal";
import Cross from "../../../secondary/Cross/Cross";
import { IModalProps } from "../../BaseModal/BaseModal";
import { FC } from "react";
interface IPlayersSearching extends IModalProps {}
const PlayersSearching: FC<IPlayersSearching> = (props) => {
  return (
    <Portal>
      <Backdrop classNames="players-search__backdrop">
        <div className="wrapper" onClick={props.onClose}>
          <Spinner></Spinner>
          <Cross></Cross>
        </div>
        <p className="title_details players-search__details">Поиск игроков</p>
      </Backdrop>
    </Portal>
  );
};
export default PlayersSearching;
