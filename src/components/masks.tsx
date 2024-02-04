export const cleanCpfCnpj = (value: string, type: "cpf" | "cnpj" = "cpf") => {
  const maxLength = type === "cnpj" ? 14 : 11;
  const realValue: string = value.replace(/\D/g, "").substring(0, maxLength);

  return realValue;
};

const calcCpfCharacters = (value: string) => {
  let maskValue: string = "";

  if (value.length <= 3) return value;

  for (let i = 0; i < value.length; i++) {
    if (i === 3 || i === 6) {
      maskValue += ".";
    }
    if (i === 9) {
      maskValue += "-";
    }
    maskValue += value.charAt(i);
  }

  return maskValue;
};

const calcCnpjCharacters = (value: string) => {
  let maskValue: string = "";

  if (value.length <= 2) return value;

  for (let i = 0; i < value.length; i++) {
    if (i > 0 && (i === 2 || i === 5)) {
      maskValue += ".";
    }
    if (i > 0 && i === 8) {
      maskValue += "/";
    }
    if (i > 0 && i === 12) {
      maskValue += "-";
    }

    maskValue += value.charAt(i);
  }

  return maskValue;
};

export const cpfMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cpf");

  const maskValue: string = calcCpfCharacters(realValue);

  return maskValue;
};

export const cnpjMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cnpj");

  const maskValue = calcCnpjCharacters(realValue);

  return maskValue;
};

export const cpfCnpjMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cnpj");

  const maskValue =
    realValue.length < 12
      ? calcCpfCharacters(value)
      : calcCnpjCharacters(value);

  return maskValue;
};
