import Div from "../../types/elements/Div";
import dom from "../classes/Dom";

function toggleSadFaceActiveClass(
  moodSmileFace: Div,
  moodSadFace: Div,
  moodAngryFace: Div
): void {
  dom.classList(moodSmileFace, "remove", "active");
  dom.classList(moodAngryFace, "remove", "active");
  dom.classList(moodSadFace, "toggle", "active");
}

export default toggleSadFaceActiveClass;
