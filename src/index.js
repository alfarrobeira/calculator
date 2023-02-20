class Calculator {
  // private fields ----------------------

  #calculatorScreen = document.querySelector("#calculator .screen");
  #calculatorButtons = document.querySelectorAll("#calculator span");
  #clearButton = document.querySelector("#calculator .clear");
  #equalsButton = document.querySelector("#calculator .eval");
  #clearHistoryButton = document.querySelector("#calculator .clear-history");
  // array for keeping the screen entries
  #history = [];

  // constructor -------------------------

  constructor() {
    this.#addListeners();
  }

  // public properties -------------------

  get calculatorScreenText() {
    return this.#calculatorScreen.innerText;
  }

  set calculatorScreenText(val) {
    this.#calculatorScreen.innerText = val;
  }

  // private methods ---------------------

  #addListeners() {
    // listen to every key on the calculator and call function to add the value on the screen
    this.#calculatorButtons.forEach((key) => {
      if (key.innerText !== "=") {
        key.addEventListener("click", (e) => this.#print(e.target.innerText));
      }
    });

    // listen to click on clear key
    this.#clearButton.addEventListener("click", () => this.#clearInput());

    // listen to click on "=" key
    this.#equalsButton.addEventListener("click", () =>
      this.#evaluate(this.calculatorScreenText)
    );

    // listen to click on clear history button
    this.#clearHistoryButton.addEventListener("click", () =>
      this.#clearHistory()
    );
  }

  // todo: call from destructor
  #removeListeners() {
    // remove EventListener  from every key on the calculator
    this.#calculatorButtons.forEach((key) => {
      if (key.innerText !== "=") {
        key.removeEventListener("click", (e) =>
          this.#print(e.target.innerText)
        );
      }
    });

    // remove EventListener from to click on clear key
    this.#clearButton.removeEventListener("click", () => this.#clearInput());

    // remove EventListener click on "=" key
    this.#equalsButton.removeEventListener("click", () =>
      this.#evaluate(this.calculatorScreenText)
    );

    // remove EventListener from click on clear history button
    this.#clearHistoryButton.removeEventListener("click", () =>
      this.#clearHistory()
    );
  }

  // returns the result of the provided expression (using the 'eval' function)
  #evaluate(expression) {
    if (expression.includes("x")) expression = expression.replaceAll("x", "*");

    // add input to history
    this.#addHistory(expression);

    // evaluate input and show result
    this.calculatorScreenText = eval(expression);
  }

  // write the value of the pressed key on the screen
  #print(val) {
    this.calculatorScreenText += val;
  }

  // clear input from the screen
  #clearInput() {
    this.calculatorScreenText = "";
  }

  // add the input from the screen to the history array and update view
  #addHistory(input) {
    this.#history.push(input);
    this.#updateHistoryView();
  }

  // clear history array and update view
  #clearHistory() {
    this.#history = [];
    this.#updateHistoryView();
  }

  // clears history view and rebuilds it from history array
  #updateHistoryView() {
    let list = document.querySelector("#calculator .bottom ul");
    list.innerHTML = "";
    let listElement;

    for (let i = 0; i < this.#history.length; i++) {
      listElement = document.createElement("li");
      listElement.innerText = this.#history[i];
      list.appendChild(listElement);
    }
  }
}

const myCalc = new Calculator();
