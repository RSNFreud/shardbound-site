import React from "react";
import s from "./label.module.scss";

export const Label = ({ text, id }: { text: string; id?: string }) => (
  <label htmlFor={id} className={s.label}>
    {text}
  </label>
);
