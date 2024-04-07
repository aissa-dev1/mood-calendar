import Div from "../../types/elements/Div";
import dom from "../classes/Dom";

function removeMoodFaceActiveClass(
  moodSmileFace: Div,
  moodSadFace: Div,
  moodAngryFace: Div
): void {
  dom.classList(moodSadFace, "remove", "active");
  dom.classList(moodAngryFace, "remove", "active");
  dom.classList(moodSmileFace, "remove", "active");
}

export default removeMoodFaceActiveClass;
