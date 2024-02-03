import "./RaitingPage.scss";
import userPicture from "../../assets/user-img.png";
import first from "../../assets/First.svg";
import second from "../../assets/second.svg";
import third from "../../assets/third.svg";
const RaitingPage = () => {
  return (
    <div className="raiting">
      <p className="title raiting__title">Таблица рейтинга</p>
      <table className="raiting__table">
        <thead className="raiting__table-head">
          <tr className="raiting__table-row">
            <td className="raiting__table-column">№</td>
            <td className="raiting__table-column">Пользователь</td>
            <td className="raiting__table-column">Счет</td>
            <td className="raiting__table-column">Любимая категория</td>
          </tr>
        </thead>
        <tbody className="raiting__table-body">
          <tr className="raiting__table-row">
            <td className="raiting__table-column">
              <img
                src={first}
                alt="иконка первого места"
                className="raiting__img"
              />
            </td>
            <td className="raiting__table-column">
              <div className="wrapper">
                <img
                  src={userPicture}
                  alt="иконка пользователя"
                  className="raiting__user-picture"
                />
                <span className="title_details raiting__details">
                  Peter Parker
                </span>
              </div>
            </td>
            <td className="raiting__table-column">3534</td>
            <td className="raiting__table-column">Машины</td>
          </tr>
          <tr className="raiting__table-row">
            <td className="raiting__table-column">
              <img
                src={second}
                alt="иконка первого места"
                className="raiting__img"
              />
            </td>
            <td className="raiting__table-column">
              <div className="wrapper">
                <img
                  src={userPicture}
                  alt="иконка пользователя"
                  className="raiting__user-picture"
                />
                <span className="title_details raiting__details">
                  Peter Parker
                </span>
              </div>
            </td>
            <td className="raiting__table-column">3534</td>
            <td className="raiting__table-column">Машины</td>
          </tr>
          <tr className="raiting__table-row">
            <td className="raiting__table-column">
              <img
                src={third}
                alt="иконка первого места"
                className="raiting__img"
              />
            </td>
            <td className="raiting__table-column">
              <div className="wrapper">
                <img
                  src={userPicture}
                  alt="иконка пользователя"
                  className="raiting__user-picture"
                />
                <span className="title_details raiting__details">
                  Peter Parker
                </span>
              </div>
            </td>
            <td className="raiting__table-column">3534</td>
            <td className="raiting__table-column">Машины</td>
          </tr>
          <tr className="extra"></tr>
        </tbody>
      </table>
    </div>
  );
};
export default RaitingPage;
