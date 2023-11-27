let input = null;
let acc = null;
let resetFlag = false;
let lastAction = null;
let memory = null;

const renderInput = () => {
  const elem = document.getElementById("input");
  const renderedValue = input ?? acc ?? 0;

  elem.innerText = renderedValue;
};

const handleCalculate = () => {
  let nextAcc = acc;
  const num = Number(input);

  if (acc === null) {
    nextAcc = num;
  } else {
    if (lastAction === "+") nextAcc = acc + num;
    if (lastAction === "-") nextAcc = acc - num;
    if (lastAction === "*") nextAcc = acc * num;
    if (lastAction === "/") nextAcc = acc / num;

    if (lastAction !== "=") lastAction = null;
  }

  console.log(num, nextAcc, lastAction);

  input = null;
  acc = nextAcc;
  resetFlag = true;

  renderInput();
};

const handleMouseClick = (event) => {
  const name = event.target.name;

  handleClick(name);
};

const handleClick = (name) => {
  switch (name) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9": {
      const num = Number(name);

      if (input === null || resetFlag) {
        input = num;
        resetFlag = false;
      } else {
        input = `${input}${num}`;
      }

      break;
    }
    case ".": {
      if (input === null || resetFlag) {
        input = "0.";
        resetFlag = false;
      } else {
        input = `${input}.`;
      }
      break;
    }

    case "+":
    case "-":
    case "*":
    case "/": {
      handleCalculate();
      lastAction = name;

      break;
    }

    case "=": {
      handleCalculate();

      break;
    }

    case "backspace": {
      const nextInput = input.slice(0, -1);
      console.log(nextInput);

      if (nextInput.length === 0) {
        input = null;
      } else {
        input = nextInput;
      }

      break;
    }

    case "reset": {
      input = null;
      acc = null;
      break;
    }

    case "MS": {
      memory = input;

      break;
    }

    case "MR": {
      if (memory !== null) {
        input = memory;
      }

      break;
    }
  }

  renderInput();
};

const handleKeyboardClick = (event) => {
  console.log(event.key);
  handleClick(event.key.toLowerCase());
};

document
  .getElementById("actionPanel")
  .addEventListener("click", handleMouseClick);

document.addEventListener("keydown", handleKeyboardClick);
