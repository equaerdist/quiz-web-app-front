import { NavLink, useNavigate } from "react-router-dom";
import enter from "../../assets/log-in.svg";
import RoundedIcon from "../RoundedIcon/RoundedIcon";
import { useAppDispatch, useAppSelector } from "../../wrappers/store-hooks";
import warning from "../../assets/free-icon-warning-564619.png";
import { change } from "../../slices/modal/modal";
const Header = () => {
  const authentificated = useAppSelector((state) => state.auth.authentificated);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onRegister = () => dispatch(change({ current: "authentification" }));
  return (
    <header className="header">
      <div className="header__left" onClick={() => navigate("/")}>
        <p className="header__title">Quiz</p>
      </div>
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
    </header>
  );
};
export default Header;
