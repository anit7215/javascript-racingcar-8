import { MissionUtils, Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const carInput = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    const numberInput = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );
    const cars = this.createCars(carInput);
    const tryCount = Number(numberInput);

    this.simulateRace(cars, tryCount);
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
  }
}

export default App;
