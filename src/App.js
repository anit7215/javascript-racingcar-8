import { MissionUtils, Console } from "@woowacourse/mission-utils";
import { validateCarNames, validateTryCount } from "./utils/validators.js";

class App {
  async run() {
    const carInput = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    validateCarNames(carInput);

    const numberInput = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );
    validateTryCount(numberInput);

    const cars = this.createCars(carInput);
    const tryCount = Number(numberInput);

    Console.print("\n실행 결과");
    this.simulateRace(cars, tryCount);
    this.printWinners(cars);
  }

  createCars(carInput) {
    const cars = carInput.split(",").map((name) => ({
      name: name.trim(),
      position: 0,
    }));
    return cars;
  }

  simulateRace(cars, tryCount) {
    for (let i = 0; i < tryCount; i++) {
      this.racingRound(cars);
    }
  }

  racingRound(cars) {
    cars.forEach((car) => {
      const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
      if (randomNumber >= 4) car.position += 1;
    });
    this.printRoundResult(cars);
  }

  printRoundResult(cars) {
    cars.forEach((car) => {
      const position = "-".repeat(car.position);
      Console.print(`${car.name} : ${position}`);
    });
    Console.print("");
  }

  printWinners(cars) {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    const winners = cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }
}

export default App;