import { HTMLAttributes } from "react";
import { Label } from "../label/label";
import s from "./input.module.scss";

type PropsType = HTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  value?: string;
};

export const Input = ({ label, id, error, value, ...restProps }: PropsType) => (
  <div>
    <Label text={label} id={id} />
    <input
      type="text"
      className={s.input}
      id={id}
      value={value}
      {...restProps}
    />
    {error && <div className={s.error}>{error}</div>}
  </div>
);
