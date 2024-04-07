import Div from "../../types/elements/Div";
import dom from "../classes/Dom";

function toggleAngryFaceActiveClass(
  moodSmileFace: Div,
  moodSadFace: Div,
  moodAngryFace: Div
): void {
  dom.classList(moodSmileFace, "remove", "active");
  dom.classList(moodSadFace, "remove", "active");
  dom.classList(moodAngryFace, "toggle", "active");
}

export default toggleAngryFaceActiveClass;
