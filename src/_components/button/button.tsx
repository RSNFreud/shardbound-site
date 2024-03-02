import { HTMLAttributes } from "react";
import s from "./button.module.scss";
import classNames from "classnames";

type PropsType = HTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "regular";
};

export const Button = ({
  children,
  className,
  variant,
  ...restProps
}: PropsType) => (
  <button
    type="button"
    className={classNames(
      s.button,
      { [s.ghost]: variant === "ghost" },
      className
    )}
    {...restProps}
  >
    {children}
  </button>
);
