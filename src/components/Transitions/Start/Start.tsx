import Portal from "../../Modals/Portal/Portal";
import video from "./output.webm";
import audio from "./audio.mp3";
import { useRef, useEffect } from "react";
import "./Start.scss";
const Start = () => {
  const audioElem = useRef<null | HTMLAudioElement>(null);
  useEffect(() => {
    if (audioElem.current) audioElem.current.volume = 1;
  }, []);
  return (
    <Portal>
      <video src={video} className="start" autoPlay></video>
      <audio src={audio} ref={audioElem} autoPlay></audio>
    </Portal>
  );
};
export default Start;
