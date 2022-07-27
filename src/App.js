import React, { useState } from "react";

import CalcBody from "./components/CalcBody";
import Screen from "./components/Screen";
import Box from "./components/Box";
import Button from "./components/Button";

const Values = [
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "="],
];

const calculate = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : b;

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // controller for the clicking on a number
  const numClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num:
        // to accomedate for more than one digit
        calc.num % 1 === 0 && !calc.num.toString().includes(".")
          ? Number(calc.num + value)
          : calc.num + value,
      res: calc.sign ? calc.res : 0,
    });
  };
  // controller for clicking on a sign
  const signClick = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: calculate(Number(calc.res), Number(calc.num), calc.sign),
      num: 0,
    });
  };
  // controller for clicking on equal sign
  const equalsClick = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res: calculate(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  // jsx statments
  return (
    <CalcBody>
      <Screen value={calc.num ? calc.num : calc.res} />
      <Box>
        {Values.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              // to make the = button large and to be like the css file
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "="
                  ? equalsClick
                  : btn === "X" || btn === "-" || btn === "+"
                  ? signClick
                  : numClick
              }
            />
          );
        })}
      </Box>
    </CalcBody>
  );
};

export default App;
