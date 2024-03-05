import { HTMLAttributes } from "react";
import { Label } from "../label/label";
import s from "./input.module.scss";
import classNames from "classnames";

type PropsType = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  value?: string;
};

export const Input = ({
  label,
  id,
  error,
  value,
  className,
  ...restProps
}: PropsType) => (
  <div>
    {label && <Label text={label} id={id} />}
    <input
      type="text"
      className={classNames(s.input, className)}
      id={id}
      value={value}
      {...restProps}
    />
    {error && <div className={s.error}>{error}</div>}
  </div>
);
