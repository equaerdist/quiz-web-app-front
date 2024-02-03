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

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="layout"></div>
        <div className="app__main">
          <div className="container">
            <ModalManager></ModalManager>
            <TransitionManager></TransitionManager>
            <Router>
              <Header></Header>
              <Routes>
                <Route path="quizes" element={<QuizPage></QuizPage>}></Route>
                <Route path="/" element={<PromoPage></PromoPage>}></Route>
                <Route
                  path="rate"
                  element={<RaitingPage></RaitingPage>}
                ></Route>
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
