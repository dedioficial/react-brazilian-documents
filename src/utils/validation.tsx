/**
 * Regex patterns for CPF and CNPJ mask inputs.
 */
export const maskPatterns = {
  CPF: new RegExp("^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"),
  CNPJ: new RegExp("^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$"),
};

function calcDigitCPF(partialCPF: number[], pesoInicial: 10 | 11) {
  const sum = partialCPF.reduce(
    (accumulated, num, index) => accumulated + num * (pesoInicial - index),
    0
  );
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function calcVerificationDigits(baseCPF: string) {
  const cpfNumbers = baseCPF.split("").map((num) => parseInt(num, 10));

  const firstDigit = calcDigitCPF(cpfNumbers, 10);
  const secondDigit = calcDigitCPF([...cpfNumbers, firstDigit], 11);

  return `${firstDigit}${secondDigit}`;
}

function cpfRegexTest(cleanCPF: string | number) {
  const cleanCPFString = cleanCPF.toString();
  if (cleanCPFString.length !== 11 || /^(\d)\1{10}$/.test(cleanCPFString))
    return false;
  return true;
}

function isCPFValid(cpf: string) {
  const cleanCPF: string = cpf.replace(/\D/g, "");

  if (!cpfRegexTest(cleanCPF)) return false;

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

function calcDigitCNPJ(cnpj: string, positions: number): number {
  let sum = 0;
  let pos = positions - 7;

  for (let i = positions; i >= 1; i--) {
    const numberTimePosition = parseInt(cnpj.charAt(positions - i)) * pos--;
    sum += numberTimePosition;
    if (pos < 2) pos = 9;
  }

  return sum % 11 < 2 ? 0 : 11 - (sum % 11);
}

function cnpjRegexTest(cleanCnpj: string | number) {
  const cleanCNPJString = cleanCnpj.toString();
  if (cleanCNPJString.length !== 14 || /^(\d)\1+$/.test(cleanCNPJString))
    return false;
  return true;
}

function isCNPJValid(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/\D/g, "");

  if (!cnpjRegexTest(cleanCnpj)) return false;

  const baseCNPJ = cleanCnpj.substring(0, 14);
  const digits = baseCNPJ.slice(-2);
  const body = baseCNPJ.slice(0, -2);

  const digit1 = calcDigitCNPJ(body, 12);
  const digit2 = calcDigitCNPJ(body + digit1, 13);

  return digits === digit1.toString() + digit2.toString();
}

/**
 * A function to validate the CNPJ based on the CNPJ algorythm created by Receita Federal do Brasil.
 *
 * @examples
 * ```JSX
 * validateCnpj('67.541.896/0001-97') // Returns true
 * validateCnpj('67541896000197') // Returns true
 * validateCnpj('11.111.111/0001-11') // Returns false
 * validateCnpj('11111111000111') // Returns false
 * ```
 */

export const validateCnpj = (cnpj: string) => {
  return isCNPJValid(cnpj);
};

/**
 * A function to validate the CPF or CNPJ based on the algorythms created by Receita Federal do Brasil.
 *
 * @examples
 * ```JSX
 * validateCpfCnpj('127.408.170-02') // Returns true
 * validateCpfCnpj('12740817002') // Returns true
 * validateCpfCnpj('111.111.111-11') // Returns false
 * validateCpfCnpj('123.456.789-01') // Returns false
 * validateCpfCnpj('67.541.896/0001-97') // Returns true
 * validateCpfCnpj('67541896000197') // Returns true
 * validateCpfCnpj('11.111.111/0001-11') // Returns false
 * validateCpfCnpj('11111111000111') // Returns false
 * ```
 */
export const validateCpfCnpj = (value: string) => {
  return isCPFValid(value) || isCNPJValid(value);
};
