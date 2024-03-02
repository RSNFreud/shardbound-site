import { HTMLAttributes } from "react";
import { Label } from "../label/label";
import s from "./checkbox.module.scss";

type PropsType = HTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  value?: string;
};

export const Checkbox = ({
  label,
  id,
  error,
  value,
  ...restProps
}: PropsType) => (
  <div>
    <div className={s.wrapper}>
      <input
        type="checkbox"
        className={s.input}
        id={id}
        value={value}
        {...restProps}
      />
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
    </div>
  </div>
);
