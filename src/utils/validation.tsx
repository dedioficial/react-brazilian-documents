/**
 * Regex patterns for CPF and CNPJ mask inputs.
 */
export const maskPatterns = {
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

/**
 * A function to validate the CPF based on the CPF algorythm created by Receita Federal do Brasil.
 *
 * @examples
 * ```JSX
 * validateCpf('127.408.170-02') // Returns true
 * validateCpf('12740817002') // Returns true
 * validateCpf('111.111.111-11') // Returns false
 * validateCpf('123.456.789-01') // Returns false
 * ```
 */

export const validateCpf = (cpf: string) => {
  return isCPFValid(cpf);
};
