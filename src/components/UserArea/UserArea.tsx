import "./UserArea.scss";
import firstWindow from "../../assets/first_window.svg";
import secondWindow from "../../assets/second_window.svg";
import thirdWindow from "../../assets/third_window.svg";
import command from "../../assets/command.svg";
const UserArea = () => {
  return (
    <div className="user">
      <nav className="user__tabs">
        <a className="user__tab"></a>
        <a className="user__tab user__tab_active"></a>
      </nav>
      <svg className="user__stats-pie" viewBox="0 0 700 700">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(65)">
            <stop
              offset="-10%"
              style={{ stopColor: "#FFF", stopOpacity: 0.00000001 }}
            />
            <stop offset="40%" style={{ stopColor: "#340650" }} />
          </linearGradient>
          <linearGradient id="Outer" gradientTransform="rotate(65)">
            <stop
              offset="-30%"
              style={{
                stopColor: "rgba(255, 255, 255, 1)",
              }}
            />
            <stop offset="80%" style={{ stopColor: "rgba(220, 95, 91, 1)" }} />
          </linearGradient>
        </defs>
        <circle
          cx="50%"
          cy="50%"
          r="115"
          className="user__inner-circle"
          fill="url(#myGradient)"
        />
        <circle
          className="user__outer-circle"
          cx="50%"
          cy="50%"
          r="250"
          stroke="url(#Outer)"
          stroke-width="92"
          stroke-linejoin="round"
          fill="none"
        />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="middle"
          className="user__shortcut"
        >
          PP
        </text>
      </svg>
      <div className="user__stats">
        <div className="wrapper">
          <div className="user__stats-card-text"></div>
          <div className="user__stats-card-text">
            <p className="digit">54%</p>
            <p className="content">вероятность дать правильный ответ</p>
          </div>
          <img
            src={firstWindow}
            alt="статистика по критерию"
            className="user__stats-card"
          />
        </div>
        <div className="wrapper">
          <div className="user__stats-card-text"></div>
          <div className="user__stats-card-text">
            <p className="digit">545</p>
            <p className="content">квиза прошли вы за последний месяц</p>
          </div>
          <img
            src={secondWindow}
            alt="статистика по критерию"
            className="user__stats-card"
          />
        </div>
        <div className="wrapper">
          <div className="user__stats-card-text">
            <p className="digit">545</p>
            <p className="content">очков квиза набрали</p>
          </div>
          <img
            src={thirdWindow}
            alt="статистика по критерию"
            className="user__stats-card"
          />
        </div>
      </div>
      <button className="button user__button">
        <img src={command} alt="кнопка профиля" className="icon" />
        Профиль
      </button>
    </div>
  );
};
export default UserArea;
