import { NavLink, useNavigate } from "react-router-dom";
import enter from "../../assets/log-in.svg";
import RoundedIcon from "../RoundedIcon/RoundedIcon";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import warning from "../../assets/free-icon-warning-564619.png";
import { change } from "../../slices/modal/modal";
import menu from "../../assets/menu.svg";
import { CSSProperties, useState } from "react";
import { disableScrolling } from "../../wrappers/utils";
const Header = () => {
  const authentificated = useAppSelector((state) => state.auth.authentificated);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const isMobile = useAppSelector((state) => state.global.isMobile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onRegister = () => dispatch(change({ current: "authentification" }));
  const [right, setRight] = useState<string>("-130%");
  const onMenuSwitch = () =>
    setRight((prevRight) => {
      disableScrolling(prevRight === "-130%");
      return prevRight === "-130%" ? "0%" : "-130%";
    });

  const style: CSSProperties | undefined = isMobile
    ? {
        right,
        top: document.querySelector(".app__main")?.scrollTop + "px",
        backgroundColor:
          right === "-130%" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.3)",
      }
    : undefined;
  return (
    <header className="header">
      <div className="header__left" onClick={() => navigate("/")}>
        <p className="header__title">Quiz</p>
      </div>
      {isMobile ? (
        <img src={menu} className="icon switch" onClick={onMenuSwitch} />
      ) : null}
      <div className="substrate" style={style} onClick={onMenuSwitch}>
        <div className="wrapper">
          {authentificated ? (
            <RoundedIcon
              onClick={() => navigate("/user")}
              src={currentUser?.thumbnail}
              label={
                !currentUser?.accepted
                  ? {
                      src: warning,
                      tooltip:
                        "Подтвердите аккаунт. Некоторые функции не доступны, в т. ч. создание квизов.",
                    }
                  : undefined
              }
            ></RoundedIcon>
          ) : (
            <button className="button button_outlined" onClick={onRegister}>
              <img src={enter} alt="войти" className="icon" />
            </button>
          )}
          <div className="header__right">
            <nav className="header__nav">
              <NavLink to="/" className=" title_details header__link first">
                Главная
              </NavLink>
              <NavLink to={"/quizes"} className=" title_details header__link">
                Квизы
              </NavLink>
              <NavLink to="rate" className=" header__link title_details  last">
                Рейтинг
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
