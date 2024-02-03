import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <p className="header__title">Quiz</p>
      </div>
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
    </header>
  );
};
export default Header;
