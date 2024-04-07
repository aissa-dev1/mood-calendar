import dom from "./ts/helpers/classes/Dom";
import handleMonths from "./ts/helpers/functions/handleMonths";
import removeMoodFaceActiveClass from "./ts/helpers/functions/removeMoodFaceActiveClass";
import storageGet from "./ts/helpers/functions/storageGet";
import storageSet from "./ts/helpers/functions/storageSet";
import toggleAngryFaceActiveClass from "./ts/helpers/functions/toggleAngryFaceActiveClass";
import toggleSadFaceActiveClass from "./ts/helpers/functions/toggleSadFaceActiveClass";
import toggleSmileFaceActiveClass from "./ts/helpers/functions/toggleSmileFaceActiveClass";
import Emoji from "./ts/types/Emoji";
import Mood from "./ts/types/Mood";
import Shape from "./ts/types/Shape";
import Theme from "./ts/types/Theme";
import Div from "./ts/types/elements/Div";
import Image from "./ts/types/elements/Image";
import Span from "./ts/types/elements/Span";

const moodCelenderHeader = dom.select<Div>(".mood-celender-header");
const moodSmileFace = dom.select<Div>(".mood-smile-face");
const moodSadFace = dom.select<Div>(".mood-sad-face");
const moodAngryFace = dom.select<Div>(".mood-angry-face");
const smileFaceImage = dom.select<Image>("#smile_face_img");
const sadFaceImage = dom.select<Image>("#sad_face_img");
const angryFaceImage = dom.select<Image>("#angry_face_img");
let numberDayContents: NodeListOf<Span> | null = null;
const randomMoodSection = dom.select<Div>(".random-mood-section");
const resetMoodSection = dom.select<Div>(".reset-mood-section");
const colorThemeSection = dom.select<Div>(".color-theme-section");
const themeImage = dom.select<Image>("#theme_img");
const shapeSection = dom.select<Div>(".shape-section");
const shapeImage = dom.select<Image>("#shape_img");
const shapeElm = dom.select<Span>("#shape");
const emojiSection = dom.select<Div>(".emoji-section");
const emojiImage = dom.select<Image>("#emoji_img");
const moodFacesSection = dom.select<Div>(".mood-faces-section");

let mood: Mood = storageGet("mood", false) || "not-selected";
let theme: Theme = storageGet("theme", false) || "light";
let shape: Shape = storageGet("shape", false) || "rounded";
let emoji: Emoji = storageGet("emoji", false) || "halloween";
const moods: string[] = ["smile-mood", "sad-mood", "angry-mood"];

window.addEventListener("load", () => {
  handleMonths(moodCelenderHeader);

  selectMood();

  handleStorageData();
});

smileFaceImage.addEventListener("click", () => {
  toggleSmileFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);

  changeMood("smile");
});

sadFaceImage.addEventListener("click", () => {
  toggleSadFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);

  changeMood("sad");
});

angryFaceImage.addEventListener("click", () => {
  toggleAngryFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);

  changeMood("angry");
});

randomMoodSection.addEventListener("click", () => {
  selectRandomMode();
});

resetMoodSection.addEventListener("click", () => {
  resetSelectedModes();
});

colorThemeSection.addEventListener("click", () => {
  toggleTheme();

  detectEmoji();
});

shapeSection.addEventListener("click", () => {
  toggleShape();
});

emojiSection.addEventListener("click", () => {
  toggleEmoji();

  detectEmoji();
});

function changeMood(newMood: Mood): void {
  switch (newMood) {
    case "smile":
      if (mood === "smile") {
        mood = "not-selected";

        storageSet("mood", "not-selected");
      } else {
        mood = "smile";

        storageSet("mood", "smile");
      }
      break;

    case "sad":
      if (mood === "sad") {
        mood = "not-selected";

        storageSet("mood", "not-selected");
      } else {
        mood = "sad";

        storageSet("mood", "sad");
      }
      break;

    case "angry":
      if (mood === "angry") {
        mood = "not-selected";

        storageSet("mood", "not-selected");
      } else {
        mood = "angry";

        storageSet("mood", "angry");
      }
      break;

    default:
      mood = "not-selected";

      storageSet("mood", "not-selected");
  }

  console.log(mood);
}

function selectMood(): void {
  numberDayContents = dom.selectAll<Span>(".n-day-content");

  numberDayContents.forEach((numberDayContent) => {
    numberDayContent.addEventListener("click", () => {
      if (
        !numberDayContent.classList.contains("hide") &&
        !numberDayContent.classList.contains("error")
      ) {
        switch (mood) {
          case "not-selected":
            const prevContent = numberDayContent.textContent;

            dom.classList(numberDayContent, "add", "error");
            numberDayContent.textContent = "!";

            setTimeout(() => {
              dom.classList(numberDayContent, "remove", "error");
              numberDayContent.textContent = prevContent;
            }, 1000);
            break;

          case "smile":
            dom.classList(numberDayContent, "remove", [
              "sad-mood",
              "angry-mood",
            ]);
            dom.classList(numberDayContent, "add", "smile-mood");
            break;

          case "sad":
            dom.classList(numberDayContent, "remove", [
              "smile-mood",
              "angry-mood",
            ]);
            dom.classList(numberDayContent, "add", "sad-mood");
            break;

          case "angry":
            dom.classList(numberDayContent, "remove", [
              "smile-mood",
              "sad-mood",
            ]);
            dom.classList(numberDayContent, "add", "angry-mood");
            break;

          default:
            dom.classList(numberDayContent, "remove", [
              "smile-mood",
              "sad-mood",
              "angry-mood",
            ]);
        }
      }
    });
  });
}

function selectRandomMode(): void {
  numberDayContents?.forEach((numberDayContent) => {
    dom.classList(numberDayContent, "remove", moods);

    dom.classList(
      numberDayContent,
      "add",
      moods[Math.floor(Math.random() * moods.length)]
    );
  });
}

function resetSelectedModes(): void {
  numberDayContents?.forEach((numberDayContent) => {
    dom.classList(numberDayContent, "remove", moods);
  });
}

function darkTheme(): void {
  theme = "dark";

  themeImage.src = "./action/sun.svg";

  themeImage.alt = "sun";

  dom.classList(document.body, "remove", "light");

  dom.classList(document.body, "add", "dark");
}

function lightTheme(): void {
  theme = "light";

  themeImage.src = "./action/moon.svg";

  themeImage.alt = "moon";

  dom.classList(document.body, "remove", "dark");

  dom.classList(document.body, "add", "light");
}

function toggleTheme(): void {
  if (theme === "light") darkTheme();
  else lightTheme();

  storageSet("theme", theme);
}

function roundedShape(): void {
  shape = "rounded";

  shapeImage.src = "./action/squared.svg";

  shapeImage.alt = "squared";

  shapeElm.textContent = "circles";

  numberDayContents?.forEach((numberDayContent) => {
    dom.classList(numberDayContent, "remove", "square");

    dom.classList(numberDayContent, "add", "circle");
  });
}

function squaredShape(): void {
  shape = "squared";

  shapeImage.src = "./action/rounded.svg";

  shapeImage.alt = "rounded";

  shapeElm.textContent = "squares";

  numberDayContents?.forEach((numberDayContent) => {
    dom.classList(numberDayContent, "remove", "circle");

    dom.classList(numberDayContent, "add", "square");
  });
}

function toggleShape(): void {
  if (shape === "squared") roundedShape();
  else squaredShape();

  storageSet("shape", shape);
}

function faceEmoji(): void {
  emoji = "face";

  emojiImage.src = "./halloween/normal.svg";

  emojiImage.alt = "normal";

  smileFaceImage.src = "./face/smile.svg";

  sadFaceImage.src = "./face/sad.svg";

  angryFaceImage.src = "./face/angry.svg";
}

function halloweenEmoji(): void {
  emoji = "halloween";

  emojiImage.src = "./face/normal.svg";

  emojiImage.alt = "normal";

  smileFaceImage.src = "./halloween/smile.svg";

  sadFaceImage.src = "./halloween/sad.svg";

  angryFaceImage.src = "./halloween/angry.svg";
}

function toggleEmoji(): void {
  if (emoji === "halloween") faceEmoji();
  else halloweenEmoji();

  storageSet("emoji", emoji);
}

function detectEmoji(): void {
  if (theme === "dark" && emoji === "face") {
    dom.classList(moodFacesSection, "add", "active");
  } else dom.classList(moodFacesSection, "remove", "active");
}

function handleStorageData(): void {
  handleStorageMood();

  handleStorageTheme();

  handleStorageShape();

  handleStorageEmoji();
}

function handleStorageMood(): void {
  switch (storageGet<Mood>("mood", false)) {
    case "not-selected":
      removeMoodFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);
      break;

    case "smile":
      toggleSmileFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);
      break;

    case "sad":
      toggleSadFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);
      break;

    case "angry":
      toggleAngryFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);
      break;

    default:
      removeMoodFaceActiveClass(moodSmileFace, moodSadFace, moodAngryFace);
  }
}

function handleStorageTheme(): void {
  switch (storageGet<Theme>("theme", false)) {
    case "light":
      lightTheme();
      break;

    case "dark":
      darkTheme();
      break;

    default:
      lightTheme();
  }
}

function handleStorageShape(): void {
  switch (storageGet<Shape>("shape", false)) {
    case "squared":
      squaredShape();
      break;

    case "rounded":
      roundedShape();
      break;

    default:
      roundedShape();
  }
}

function handleStorageEmoji(): void {
  switch (storageGet<Emoji>("emoji", false)) {
    case "face":
      faceEmoji();
      break;

    case "halloween":
      halloweenEmoji();
      break;

    default:
      halloweenEmoji();
  }

  detectEmoji();
}
