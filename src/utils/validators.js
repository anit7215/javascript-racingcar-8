export function validateCarNames(carInput) {
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

export function validateTryCount(numberInput) {
  if (!numberInput.trim()) {
    throw new Error("[ERROR] 시도할 횟수를 입력해야 합니다.");
  }

  const tryCount = Number(numberInput);
  if (!Number.isInteger(tryCount) || tryCount <= 0) {
    throw new Error("[ERROR] 시도할 횟수는 양의 정수여야 합니다.");
  }
}
