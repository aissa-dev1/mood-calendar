import IDom from "../interfaces/IDom";
import ClassListType from "../types/ClassListType";
import Selector from "../types/Selector";

class Dom implements IDom {
  public select<E extends Element>(selector: Selector): E {
    const element = document.querySelector<E>(selector)!;

    return element;
  }

  public selectAll<E extends Element>(selectors: Selector): NodeListOf<E> {
    const elements = document.querySelectorAll<E>(selectors);

    return elements;
  }

  public create<E extends keyof HTMLElementTagNameMap>(
    element: E,
    content?: string | undefined
  ): HTMLElementTagNameMap[E] {
    const created_element = document.createElement<E>(element);

    if (content) {
      created_element.appendChild(document.createTextNode(content));

      return created_element;
    }

    return created_element;
  }

  public classList(
    element: Element,
    type: ClassListType,
    classNames: string | string[]
  ): void {
    if (typeof classNames === "string") {
      switch (type) {
        case "add":
          element.classList.add(classNames);
          break;

        case "remove":
          element.classList.remove(classNames);
          break;

        case "toggle":
          element.classList.toggle(classNames);
          break;

        default:
          element.classList.add(classNames);
      }
    } else {
      for (const className of classNames) {
        switch (type) {
          case "add":
            element.classList.add(className);
            break;

          case "remove":
            element.classList.remove(className);
            break;

          case "toggle":
            element.classList.toggle(className);
            break;

          default:
            element.classList.add(className);
        }
      }
    }
  }
}

const dom = new Dom();

export default dom;
