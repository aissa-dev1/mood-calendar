import months from "../../data/months";
import Div from "../../types/elements/Div";
import dom from "../classes/Dom";

function handleMonths(moodCelenderHeader: Div): void {
  months.forEach((month) => {
    const monthSection = dom.create("section");
    const monthElm = dom.create("p", month.name);
    const textDaysSection = dom.create("section");
    const numberDaysSection = dom.create("section");

    for (const tDay of month.textDays) {
      const textDay = dom.create("div");
      const textDayContent = dom.create("p", tDay);

      dom.classList(textDay, "add", "t-day");

      textDay.appendChild(textDayContent);
      textDaysSection.appendChild(textDay);
    }

    for (const nDay of month.numberDays) {
      const numberDay = dom.create("div");
      const numberDayContent = dom.create(
        "span",
        typeof nDay === "number" ? `${nDay}` : ""
      );

      dom.classList(numberDay, "add", "n-day");
      dom.classList(
        numberDayContent,
        "add",
        typeof nDay === "number"
          ? ["n-day-content", "square"]
          : ["n-day-content", "square", "hide"]
      );

      numberDay.appendChild(numberDayContent);
      numberDaysSection.appendChild(numberDay);
    }

    dom.classList(monthSection, "add", "month-section");
    dom.classList(monthElm, "add", "month");
    dom.classList(textDaysSection, "add", "t-days-section");
    dom.classList(numberDaysSection, "add", "n-days-section");

    monthSection.append(monthElm, textDaysSection, numberDaysSection);
    moodCelenderHeader.appendChild(monthSection);
  });
}

export default handleMonths;
