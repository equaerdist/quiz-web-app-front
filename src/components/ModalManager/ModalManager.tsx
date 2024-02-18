import Chat from "../Modals/Completes/Chat/Chat";
import ChoosePlayers from "../Modals/Play/ChoosePlayers/ChoosePlayers";
import ChooseRoom from "../Modals/Play/ChooseRoom/ChooseRoom";
import CreateQuiz from "../Modals/CreateQuiz/CreateQuiz";
import CreateCard from "../Modals/CreateCard/CreateCard";
import AnswerEditor from "../Modals/AnswerEditor/AnswerEditor";
import Authentification from "../Modals/Authentification/Authentification";
import RegistrationEnd from "../Modals/Completes/RegistrationEnd";
import ChooseMode from "../Modals/CreateQuiz/ChooseMode";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import { change, setCondition } from "../../slices/modal/modal";
import Complete from "../Modals/Completes/Complete";
import Loading from "../Modals/Completes/Loading/Loading";
const ModalManager = () => {
  const current = useAppSelector((state) => state.modal.current);
  const transferData = useAppSelector((STATE) => STATE.modal.transferData);
  const backPath = useAppSelector((state) => state.modal.backPath);
  const condition = useAppSelector((state) => state.modal.condition);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(change({ current: "" }));
    dispatch(setCondition("idle"));
  };
  if (condition === "loading") return <Loading></Loading>;
  return (
    <>
      {current === "chat" ? <Chat onClose={onClose}></Chat> : null}
      {current === "choosePlayers" ? (
        <ChoosePlayers onClose={onClose}></ChoosePlayers>
      ) : null}
      {current === "chooseRoom" ? (
        <ChooseRoom onClose={onClose}></ChooseRoom>
      ) : null}
      {current === "createQuiz" ? (
        <CreateQuiz onClose={onClose}></CreateQuiz>
      ) : null}
      {current === "createAnswer" ? (
        <AnswerEditor
          onClose={onClose}
          name={transferData}
          backPath={backPath}
        ></AnswerEditor>
      ) : null}
      {current === "authentification" ? (
        <Authentification onClose={onClose}></Authentification>
      ) : null}
      {current === "registrationEnd" ? (
        <RegistrationEnd onClose={onClose}></RegistrationEnd>
      ) : null}
      {current === "chooseMode" ? (
        <ChooseMode onClose={onClose}></ChooseMode>
      ) : null}
      {current === "createCard" ? (
        <CreateCard name={transferData} onClose={onClose}></CreateCard>
      ) : null}
      {current === "complete" ? <Complete onClose={onClose}></Complete> : null}
    </>
  );
};
export default ModalManager;
