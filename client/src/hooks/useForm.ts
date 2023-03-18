import { useState } from "react";

export default function useForm(callback: () => void, initialState = {}) {
  const [values, setValues] = useState(initialState);

  const onChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const onSubmit = () => {
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
}