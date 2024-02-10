# CNPJ Input

A input to handle brazilian CNPJ. Applys mask automatically.

## Component Props

|     Prop     |          Type          |  Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :----------: | :--------------------: | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     name     |         string         |  'cnpj'   | The name of the input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|      as      |   React.ElementType    |  "input"  | Component type to be rendered. Must be a component that uses `input` element. This prop can be used with UI libraries like [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap), [mui/material](https://github.com/mui/material-ui), etc.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| defaultValue |         string         | undefined | Default value of the input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|   hookForm   |     UseFormReturn      | undefined | If `react-hook-form` is used, this prop should receive the methods: `register`, and `setValue`. This will properly set the CNPJ value into the react hook form state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|     mode     |         1 or 2         |     1     | `mode: 1` The component will render two inputs: a dummy one for the mask, and the real value input hidden. This is so the value to be sended by the form will always be the cleaned value of CNPJ, without mask. The dummy input will have no `name` prop, and will not be sended with the form. If the property `hookForm` is passed, the real input will not be rendered, instead the component will use `setValue('cnpj', 'cnpj_value')` to set the value in the form state. <br/><br/>`mode: 2` The component will render only the mask input, and this will receive the name prop. This way the value will be sended formatted with the mask, and should be treated externally. |
|   onChange   | `(MaskValues) => void` | undefined | The onChange event will send a `MaskValues` object, that has a `value: string` with the real value of CNPJ typed (without mask, only numbers), and `mask: string` with the masked value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|   validate   |        boolean         |   true    | If `hookForm` prop is passed, this option will add a `validate` method into `register` action that will validate the CNPJ inputed using the algorythm created by Receita Federal do Brasil. If not valid, the `react-hook-form` will not submit the form and trigger an error into the `useForm -> formState: { errors }`.                                                                                                                                                                                                                                                                                                                                                           |

## Examples

### Simple form

```TSX
import { CnpjInput } from "react-brazilian-documents";
import { FormEvent } from "react";

const App = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>CNPJ:</label>

        <CnpjInput />

        <button type="submit">
          Send
        </button>
      </form>
    </>
  );
}
```

### React Hook Form

```TSX
import { CnpjInput } from "react-brazilian-documents";
import { useForm } from "react-hook-form";

interface FormValues {
  cnpj: string | null;
}

const App = () => {
  const { register, setValue, formState: { errors }, handleSubmit, } = useForm<FormValues>();

  const onSubmit = (form: FormValues) => {
    console.log(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>CNPJ:</label>
        <CnpjInput
          className={`${errors.cnpj && "invalid"}`}
          hookForm={{
            register,
            setValue,
          }}
        />
        <button type="submit">Send</button>

        {errors.cnpj && <small>Invalid CNPJ.</small>}
      </form>
    </>
  );
}
```
