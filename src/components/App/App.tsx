import "./App.scss";
import PromoPage from "../PromoPage/PromoPage";
import Header from "../Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import * as signalR from "@microsoft/signalr";
import config from "../../wrappers/config";
import {
  AnswerInfo,
  GetQuizCardDto,
  MatchEndsInfo,
  MatchStartsInfo,
  Message,
} from "../../Dtos/quizGame";
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="layout"></div>
        <div className="app__main">
          <div className="container">
            <View></View>
          </div>
        </div>
      </div>
    </Provider>
  );
}
const View = () => {
  const dispatch = useAppDispatch();
  const authentificated = useAppSelector((state) => state.auth.authentificated);
  useEffect(() => {
    if (authentificated == true) dispatch(fetchForGetUserData());
  }, [authentificated]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  useEffect(() => {
    dispatch(fetchForAuthentificationCheck());

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${config}quiz`)
      .build();
    connection.on("ReceiveMessage", function (message: Message) {});
    connection.on("ReceiveQuestion", function (answer: GetQuizCardDto) {});
    connection.on("ReceiveAnswer", function (info: AnswerInfo) {});
    connection.on("GameStarts", function (info: MatchStartsInfo) {});
    connection.on("GameEnds", function (info: MatchEndsInfo) {});
    connectionRef.current = connection;
  }, []);
  return (
    <>
      <ModalManager></ModalManager>
      <TransitionManager></TransitionManager>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="quizes" element={<QuizPage></QuizPage>}></Route>
          <Route path="/" element={<PromoPage></PromoPage>}></Route>
          <Route path="rate" element={<RaitingPage></RaitingPage>}></Route>
          <Route path="user" element={<UserArea></UserArea>}></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
