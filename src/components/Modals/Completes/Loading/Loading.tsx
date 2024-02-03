import Spinner from "../../../secondary/Spinner/Spinner";
import Backdrop from "../../Backdrop";
import BaseModal from "../../BaseModal/BaseModal";

interface ILoadingProps {
  onClose?: () => void;
}

const Loading = (props: ILoadingProps) => {
  return (
    <BaseModal onClose={props.onClose ?? function () {}}>
      <Backdrop>
        <Spinner></Spinner>
      </Backdrop>
    </BaseModal>
  );
};
export default Loading;
