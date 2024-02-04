# Utilitie functions

Utilities functions to mask, unmask and validate CPF and CNPJ.

|           Function            | Description                                                                                                      |
| :---------------------------: | ---------------------------------------------------------------------------------------------------------------- |
| [cleanCpfCnpj](#cleancpfcnpj) | Cleans up non digit characters from a CPF or CNPJ, and trims extra characters beyond the length of CPF and CNPJ. |
|      [cpfMask](#cpfmask)      | A function to mask numeric values into CPF mask.                                                                 |
|     [cnpjMask](#cnpjmask)     | A function to mask numeric values into CNPJ mask.                                                                |
|  [cpfCnpjMask](#cpfcnpjmask)  | A function to mask numeric values into CPF or CNPJ mask, based on the characters length.                         |
|  [validateCpf](#validateCpf)  | A function to validate the CPF based on the CPF algorythm created by Receita Federal do Brasil.                  |

## Using

Import the wanted function from `react-brazilian-documents`;

```JSX
import { cleanCpfCnpj, cpfMask, cnpjMask, cpfCnpjMask, validateCpf } from 'react-brazilian-documents';
```

## cleanCpfCnpj

Cleans up non digit characters from a CPF or CNPJ, and trims extra characters beyond the length of CPF and CNPJ.

| Argument |          Type           | Description                            |
| :------: | :---------------------: | -------------------------------------- |
|  value   |         string          | The CPF or CNPJ string to be cleaned.  |
|   type   | `'cpf'` &#124; `'cnpj'` | Default `'cpf'`. The type of document. |

- **Returns**: (string) The cleaned CPF or CNPJ string.

- **Examples**:

  ```JSX
  import { cleanCpfCnpj } from 'react-brazilian-documents';

  cleanCpfCnpj('123.456.789-12'); // Returns '12345678912'
  cleanCpfCnpj('12.345.678/0001-90'); // Returns '12345678000' since `type` is defaulted to `'cpf'`
  cleanCpfCnpj('12.345.678/0001-90', 'cnpj'); // Returns '12345678000190'
  cleanCpfCnpj('1a2.34b5.c678/d0001-9?0', 'cnpj'); // Returns '12345678000190'
  ```

## cpfMask

A function to mask numeric values into CPF mask.

| Argument |  Type  | Description                   |
| :------: | :----: | ----------------------------- |
|  value   | string | The CPF numbers to be masked. |

- **Returns**: (string) The masked CPF string.

- **Examples**:

  ```JSX
  import { cpfMask } from 'react-brazilian-documents';

  cpfMask('12345678912'); // Returns '123.456.789-12'

  // Passing less than 11 digits will mask it as an incomplete CPF
  cpfMask('123456abcdf'); // Returns '123.456'

  // Passing a CNPJ will mask it as a CPF removing extra characters
  cnpjMask('12345678000190'); // Returns '123.456.780-00'
  ```

## cnpjMask

A function to mask numeric values into CNPJ mask.

| Argument |  Type  | Description                    |
| :------: | :----: | ------------------------------ |
|  value   | string | The CNPJ numbers to be masked. |

- **Returns**: (string) The masked CNPJ string.

- **Examples**:

  ```JSX
  import { cnpjMask } from 'react-brazilian-documents';

  cnpjMask('12345678000190'); // Returns '12.345.678/0001-90'

  // Passing a CPF as a value will mask it as an incomplete CNPJ
  cnpjMask('12345678912'); // Returns '12.345.678/912'
  ```

## cpfCnpjMask

A function to mask numeric values into CPF or CNPJ mask, based on the characters length. This function uses the above functions.

| Argument |  Type  | Description               |
| :------: | :----: | ------------------------- |
|  value   | string | The numbers to be masked. |

- **Returns**: (string) The masked CPF or CNPJ string.

- **Examples**:

  ```JSX
  import { cpfCnpjMask } from 'react-brazilian-documents';

  cpfCnpjMask('12345678912'); // Returns '123.456.789-12'
  cpfCnpjMask('12345678000190'); // Returns '12.345.678/0001-90'

  // Passing incomplete values returns incomplete masks
  cpfCnpjMask('12345678912'); // Returns '12.345.678/912'
  cpfCnpjMask('12345678912'); // Returns '12.345.678/912'
  ```

## validateCpf

A function to validate the CPF based on the CPF algorythm created by Receita Federal do Brasil. The function will clean up non digits.

| Argument |  Type  | Description              |
| :------: | :----: | ------------------------ |
|   cpf    | string | The CPF to be validated. |

- **Returns**: (string) The masked CPF or CNPJ string.

- **Examples**:

  ```JSX
  import { validateCpf } from 'react-brazilian-documents';

  validateCpf('127.408.170-02') // Returns true
  validateCpf('12740817002') // Returns true
  validateCpf('111.111.111-11') // Returns false
  validateCpf('123.456.789-01') // Returns false
  ```
