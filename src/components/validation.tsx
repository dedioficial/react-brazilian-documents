export const patterns = {
  CPF: new RegExp("^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"),
  CNPJ: new RegExp("^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$"),
};

function calcDigit(partialCPF: number[], pesoInicial: 10 | 11) {
  const sum = partialCPF.reduce(
    (accumulated, num, index) => accumulated + num * (pesoInicial - index),
    0
  );
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function calcVerificationDigits(baseCPF: string) {
  const cpfNumbers = baseCPF.split("").map((num) => parseInt(num, 10));

  const firstDigit = calcDigit(cpfNumbers, 10);
  const secondDigit = calcDigit([...cpfNumbers, firstDigit], 11);

  return `${firstDigit}${secondDigit}`;
}

function isCPFValid(cpf: string) {
  const cleanCPF: string = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;

  const baseCPF = cleanCPF.substring(0, 9);
  const verificationDigits = cleanCPF.substring(9, 11);
  const digitsCalculated = calcVerificationDigits(baseCPF);

  return verificationDigits === digitsCalculated;
}

export const validateCpf = (v: string) => {
  return isCPFValid(v);
};
