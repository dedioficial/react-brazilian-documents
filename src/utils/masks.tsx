/**
 * A function to cleanup non digit characters from a CPF or CNPJ.
 *
 * If `type` prop is set to `'cpf'` it will remove extra digits that passes 11 characters.
 *
 * If `type` prop is set to `'cnpj'` it will remove extra digits that passes 14 characters.
 *
 * @examples
 * ```JSX
 * cleanCpfCnpj('111.111.111-11'); // Returns '11111111111'
 * cleanCpfCnpj('11.111.111/1111-11'); // Returns '11111111111' since `type` is defaulted to `'cpf'`
 * cleanCpfCnpj('11.111.111/1111-11', 'cnpj'); // Returns '11111111111111'
 * cleanCpfCnpj('11.a111.111b/1111-11b1111', 'cnpj'); // Returns '11111111111111'
 * ```
 */

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

/**
 * A function to mask a value into CPF mask.
 *
 * @examples
 * ```JSX
 * cpfMask('11111111111'); // Returns '111.111.111-11'
 *
 * // Passing a CNPJ as a value will mask it as a CPF removing extra characters
 * cnpjMask('11111111111111'); // Returns '111.111.111-11'
 * ```
 */
export const cpfMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cpf");

  const maskValue: string = calcCpfCharacters(realValue);

  return maskValue;
};

/**
 * A function to mask a value into CNPJ mask.
 *
 * @examples
 * ```JSX
 * cnpjMask('11111111111111'); // Returns '11.111.111/1111-11'
 *
 * // Passing a CPF as a value will mask it as an incomplete CNPJ
 * cnpjMask('11111111111'); // Returns '11.111.111/111'
 * ```
 */
export const cnpjMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cnpj");

  const maskValue = calcCnpjCharacters(realValue);

  return maskValue;
};

/**
 * A function to mask a value into CNPJ or CPF mask based on the characters length.
 *
 * @example
 * ```JSX
 * cpfCnpjMask('11111111111'); // Returns '111.111.111-11'
 * cpfCnpjMask('11111111111111'); // Returns '11.111.111/1111-11'
 *
 * // Passing incomplete values returns incomplete masks
 * cpfCnpjMask('111111111'); // Returns '111.111.111'
 * cpfCnpjMask('111111111111'); // Returns '11.111.111/1111' *
 * ```
 */
export const cpfCnpjMask = (value: string) => {
  const realValue = cleanCpfCnpj(value, "cnpj");

  const maskValue =
    realValue.length < 12
      ? calcCpfCharacters(value)
      : calcCnpjCharacters(value);

  return maskValue;
};
