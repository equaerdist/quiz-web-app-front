import plus from "../../assets/plus.svg";
import { useAppDispatch } from "../../wrappers/store-hooks";
import { change } from "../../slices/modal/modal";
interface ICreateQuizProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}
const CreateQuizCard: React.FC<ICreateQuizProps> = () => {
  const dispatch = useAppDispatch();
  const onQuizCreate = () => dispatch(change({ current: "createQuiz" }));
  return (
    <div className="card create" onClick={onQuizCreate}>
      <img src={plus} alt="создать" className="icon" />
      <p className="title">Создать квиз</p>
    </div>
  );
};
export default CreateQuizCard;
