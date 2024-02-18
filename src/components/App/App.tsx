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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
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
  useEffect(() => {
    dispatch(fetchForAuthentificationCheck());
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
