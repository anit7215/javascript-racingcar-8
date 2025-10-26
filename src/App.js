import { MissionUtils, Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const carInput = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    this.validateCarNames(carInput);

    const numberInput = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );
    this.validateTryCount(numberInput);

    const cars = this.createCars(carInput);
    const tryCount = Number(numberInput);

    Console.print("\n실행 결과");
    this.simulateRace(cars, tryCount);
    this.printWinners(cars);
  }

  validateCarNames(carInput) {
    const names = carInput.split(",").map((name) => name.trim());

    if (names.some((name) => name === "")) {
      throw new Error("[ERROR] 자동차 이름은 공백일 수 없습니다.");
    }

    if (names.some((name) => name.length > 5)) {
      throw new Error("[ERROR] 자동차 이름은 5자 이하만 가능합니다.");
    }

    if (new Set(names).size !== names.length) {
      throw new Error("[ERROR] 자동차 이름은 중복될 수 없습니다.");
    }
    
    const validNameRegex = /^[a-zA-Z0-9]+$/;
    if (names.some((name) => !validNameRegex.test(name))) {
      throw new Error(
        "[ERROR] 자동차 이름은 공백이나 특수문자를 포함할 수 없습니다."
      );
    }
  }

  validateTryCount(numberInput) {
    if (!numberInput.trim()) {
      throw new Error("[ERROR] 시도할 횟수를 입력해야 합니다.");
    }
    const tryCount = Number(numberInput);
    if (!Number.isInteger(tryCount) || tryCount <= 0) {
      throw new Error("[ERROR] 시도할 횟수는 양의 정수여야 합니다.");
    }
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
