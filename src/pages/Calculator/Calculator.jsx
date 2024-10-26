import React, { useState } from "react";
import "./Calculator.css"; // เพิ่มไฟล์ CSS

function Calculator() {
  const [result, setResult] = useState("0");
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const calculate = () => {
    if (operator && currentValue !== null) {
      const parsedResult = parseFloat(result);
      let newValue;

      switch (operator) {
        case "+":
          newValue = currentValue + parsedResult;
          break;
        case "-":
          newValue = currentValue - parsedResult;
          break;
        case "*":
          newValue = currentValue * parsedResult;
          break;
        case "/":
          newValue = currentValue / parsedResult;
          break;
        default:
          return;
      }

      setResult(String(newValue));
      setCurrentValue(newValue);
      setOperator(null);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        <input
          type="text"
          className="result-display"
          disabled
          value={result}
        />
      </div>
      <div className="calculator-buttons">
        <button onClick={() => setResult("0")}>C</button>
        <button
          onClick={() => {
            setResult("0");
            setCurrentValue(null);
            setOperator(null);
          }}
        >
          CA
        </button>
        <button>%</button>
        <button
          onClick={() => {
            if (currentValue === null) {
              setCurrentValue(parseFloat(result));
            } else if (operator) {
              calculate();
            }
            setOperator("/");
            setResult("0");
          }}
        >
          /
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "7" : prev + "7"))}>
          7
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "8" : prev + "8"))}>
          8
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "9" : prev + "9"))}>
          9
        </button>
        <button
          onClick={() => {
            if (currentValue === null) {
              setCurrentValue(parseFloat(result));
            } else if (operator) {
              calculate();
            }
            setOperator("*");
            setResult("0");
          }}
        >
          X
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "4" : prev + "4"))}>
          4
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "5" : prev + "5"))}>
          5
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "6" : prev + "6"))}>
          6
        </button>
        <button
          onClick={() => {
            if (currentValue === null) {
              setCurrentValue(parseFloat(result));
            } else if (operator) {
              calculate();
            }
            setOperator("-");
            setResult("0");
          }}
        >
          -
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "1" : prev + "1"))}>
          1
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "2" : prev + "2"))}>
          2
        </button>
        <button onClick={() => setResult((prev) => (prev === "0" ? "3" : prev + "3"))}>
          3
        </button>
        <button
          onClick={() => {
            if (currentValue === null) {
              setCurrentValue(parseFloat(result));
            } else if (operator) {
              calculate();
            }
            setOperator("+");
            setResult("0");
          }}
        >
          +
        </button>
        <button className="zero-button" onClick={() => setResult((prev) => (prev === "0" ? "0" : prev + "0"))}>
          0
        </button>
        <button onClick={() => setResult((prev) => (prev.includes(".") ? prev : prev + "."))}>
          .
        </button>
        <button
          onClick={() => {
            calculate();
            setCurrentValue(null);
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
