import "./App.scss";
import PromoPage from "../PromoPage/PromoPage";
import Header from "../Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import QuizPage from "../QuizPage/QuizPage";
import { Provider } from "react-redux";
import store from "../../store";
import RaitingPage from "../RaitingPage/RaitingPage";
import ModalManager from "../ModalManager/ModalManager";
import TransitionManager from "../Transitions/TransitionManager";
import UserArea from "../UserArea/UserArea";
import {
  fetchForAuthentificationCheck,
  fetchForGetUserData,
} from "../../slices/auth/auth";
import { setConnection, setMobile } from "../../slices/global/global";
import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import config from "../../wrappers/config";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";

import { MatchStartsInfo, Message } from "../../Dtos/quizGame";
import { goTo } from "../../slices/transition/transition";
import QuestionPage from "../QuestionPage/QuestionPage";
import { change } from "../../slices/modal/modal";
import { selectModal } from "../../wrappers/utils";
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="layout"></div>
        <div className="app__main">
          <div className="container">
            <Router>
              <View></View>
            </Router>
          </div>
        </div>
      </div>
    </Provider>
  );
}
const View = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authentificated = useAppSelector((state) => state.auth.authentificated);

  function handleResize(this: Window) {
    dispatch(setMobile(this.innerWidth <= 780));
  }
  const callTransition = (info: MatchStartsInfo) => {
    dispatch(goTo("start"));
    dispatch(change({ current: "" }));
    setTimeout(() => {
      dispatch(goTo(""));
      navigate(
        `quizes/${info.quizId}?amountOfQuestions=${info.amountOfQuestion}`
      );
    }, 2500);
  };

  useEffect(() => {
    if (authentificated == true) dispatch(fetchForGetUserData());
  }, [authentificated]);

  useEffect(() => {
    dispatch(fetchForAuthentificationCheck());
    window.addEventListener("resize", handleResize);
    //#region signalR
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(`${config.api}quizHub`)
      .withAutomaticReconnect()
      .build();
    connection.on("ReceiveMessage", function (message: Message) {
      selectModal(dispatch, message, connection);
    });
    connection.on("GameStarts", function (info: MatchStartsInfo) {
      callTransition(info);
    });
    connection.start();
    connection.onreconnected(() => console.log("RECONNECT"));
    dispatch(setConnection(connection));
    //#endregion
    return () => {
      connection.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ModalManager></ModalManager>
      <TransitionManager></TransitionManager>

      <Header></Header>
      <Routes>
        <Route path="quizes" element={<QuizPage></QuizPage>}></Route>
        <Route path="/" element={<PromoPage></PromoPage>}></Route>
        <Route path="rate" element={<RaitingPage></RaitingPage>}></Route>
        <Route path="user" element={<UserArea></UserArea>}></Route>
        <Route
          path="quizes/:id"
          element={<QuestionPage></QuestionPage>}
        ></Route>
      </Routes>
    </>
  );
};
export default App;
