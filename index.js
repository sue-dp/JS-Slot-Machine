function slotMachine() {
  let symbols = ["@", "#", "$", "%", "&", "*", "+", "X", "="];

  function getRandomSymbol() {
    const indexRandom = Math.floor(Math.random() * symbols.length);
    return symbols[indexRandom];
  }
  let r1 = []; //r1 = result of spin
  for (let i = 0; i < 9; i++) {
    r1.push(getRandomSymbol());
  }

  let r2 = []; //r2 = return of spin(r1)
  r2.push(
    " " +
      r1[0] +
      " " +
      r1[1] +
      " " +
      r1[2] +
      "\n[" +
      r1[3] +
      " " +
      r1[4] +
      " " +
      r1[5] +
      "]\n" +
      " " +
      r1[6] +
      " " +
      r1[7] +
      " " +
      r1[8]
  );

  r2.push([r1[3], r1[4], r1[5]]);
  return r2;
}

function winOrLose(winSpin, currentBalance, betAmt) {
  if ((winSpin[1][0] === winSpin[1][1]) === winSpin[1][2]) {
    currentBalance = currentBalance + betAmt;
  } else if (
    winSpin[1][0] === winSpin[1][1] ||
    winSpin[1][1] === winSpin[1][2] ||
    winSpin[1][0] === winSpin[1][2]
  ) {
    currentBalance = currentBalance + betAmt / 2;
  } else {
    currentBalance = currentBalance - betAmt;
  }
  return currentBalance;
}

async function spinTheWheel() {
  try {
    const response = await prompt("Do you want to spin the wheel?");
    if (response === "y") {
      return slotMachine();
    } else if (result === "n") {
      return false;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

console.log("Welcome to L.O.S.E.R!!");
let currentBalance = 100;

async function mainMenu() {
  console.log("Your current balance is: $" + currentBalance);

  while (true) {
    const mainMenu =
      "Please choose from the following options:\n1: Balance Check\n2: Place a Bet\n3: Quit";
    const userInput = prompt(mainMenu);

    if (userInput === "1") {
      console.log("Your current balance is: $" + currentBalance);
    } else if (userInput === "2") {
      const betAmtInput = "How much would you like to bet?";
      const betAmt = prompt(betAmtInput);
      if (betAmt > currentBalance) {
        console.log(
          "Please choose an amount equal to or lower than $" + currentBalance
        );
      } else {
        let winSpin = await spinTheWheel();
        if (winSpin === false) {
          continue;
        } else {
          console.log(winSpin[0]);
          currentBalance = winOrLose(winSpin, currentBalance, betAmt);
          console.log("Your current balance is: $" + currentBalance);
        }
      }
    } else if (userInput === "3") {
      console.log("Thank you, See you next time!");
      break;
    } else if (userInput === null) {
      console.log("Thank you, See you next time!");
      break;
    }
  }
}

mainMenu();
