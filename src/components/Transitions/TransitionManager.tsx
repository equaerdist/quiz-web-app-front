import Start from "./Start/Start";
import { useAppSelector } from "../../wrappers/store-hooks";
const TransitionManager = () => {
  const current = useAppSelector((state) => state.transition.current);
  return <> {current === "start" ? <Start></Start> : null}</>;
};
export default TransitionManager;
