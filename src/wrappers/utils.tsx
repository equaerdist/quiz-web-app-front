import { AppDispatch } from "../store";
import { change, setCondition } from "../slices/modal/modal";
import { Message, MessageType, NotifyType } from "../Dtos/quizGame";
import { HubConnection } from "@microsoft/signalr";
export const selectModal = (
  dispatch: AppDispatch,
  message: Message,
  connection: HubConnection
) => {
  const condition = message.type === MessageType.Error ? "Error" : "idle";
  const details = message.content;
  const sessionData = "Уведомление";
  const current =
    message.notifyType === NotifyType.GameQueue
      ? "playersSearching"
      : "complete";
  const defaultFunc = () => {
    dispatch(change({ current: "" }));
  };
  const buttons = message.buttons?.map((item) => {
    const onClick =
      item.action !== null
        ? () => {
            if (!item.action) throw new Error();
            if (item.transferInfo)
              connection.invoke(item.action, item.transferInfo);
            else connection.invoke(item.action);
          }
        : defaultFunc;
    return (
      <button className="button" onClick={onClick}>
        {item.content}
      </button>
    );
  });
  dispatch(change({ current, sessionData, details, buttons }));
  dispatch(setCondition(condition));
};
export const disableScrolling = (type: boolean) => {
  let style: string = "empty";
  if (type) style = "hidden";
  else style = "auto";
  let app = document.querySelector(".app__main") as HTMLDivElement;
  if (app) app.style.overflowY = style;
};
