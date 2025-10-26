import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test.each([
    { inputs: ["pobi,javaji", "3"], description: "자동차 이름 5자 초과" },
    { inputs: ["pobi,,woni", "3"], description: "자동차 이름 비어 있음" },
    { inputs: ["pobi,won!", "3"], description: "자동차 이름에 특수문자 포함" },
    { inputs: ["pobi,pobi", "3"], description: "자동차 이름 중복" },
    { inputs: ["", "1"], description: "자동차 이름 입력 없음" },
    { inputs: ["pobi,woni", "-1"], description: "시도할 횟수가 음수" },
    { inputs: ["pobi,woni", "0"], description: "시도할 횟수가 0" },
    { inputs: ["pobi,woni", "1.5"], description: "시도할 횟수가 소수" },
    { inputs: ["pobi,woni", "abc"], description: "시도할 횟수가 숫자가 아님" },
    { inputs: ["pobi,woni", ""], description: "시도 횟수 미입력" },
  ])("예외 테스트 - $description", async ({ inputs }) => {
    // given
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});
