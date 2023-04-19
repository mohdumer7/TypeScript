//VALIDATION
interface validatable {
  value: string | number;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: validatable) {
  let isvalid = true;
  if (validatableInput.required) {
    isvalid = isvalid && validatableInput.value.toString().trim().length > 0;
  }
  if (
    validatableInput.minlength != null &&
    typeof validatableInput.value !== "string"
  ) {
    isvalid =
      isvalid && validatableInput.value.length > validatableInput.minlength;
  }
  if (
    validatableInput.maxlength != null &&
    typeof validatableInput.value !== "string"
  ) {
    isvalid =
      isvalid && validatableInput.value.length < validatableInput.maxlength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isvalid = isvalid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isvalid = isvalid && validatableInput.value <= validatableInput.max;
  }
  return isvalid;
}

//AUTOBIND
function AutoBind(
  target: any,
  mothodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundfn = originalMethod.bind(this);
      return boundfn;
    },
  };
  return adjustedDescriptor;
}

//Project List Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
  }

  private attach() {}
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titlevalidatable: validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionvalidatable: validatable = {
      value: enteredDescription,
      required: true,
      minlength: 5,
    };
    const peoplevalidatable: validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
    };

    if (
      !validate(titlevalidatable) ||
      !validate(descriptionvalidatable) ||
      !validate(peoplevalidatable)
    ) {
      alert("enter the right values");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

//Project Input Class
const prjInput = new ProjectInput();
