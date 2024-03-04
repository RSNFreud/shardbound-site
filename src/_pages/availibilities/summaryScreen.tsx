import { Button } from "@/_components/button/button";
import s from "./availibilities.module.scss";
import { useState } from "react";

export const SummaryScreen = ({
  submit,
  back,
}: {
  submit: () => void;
  back: () => void;
}) => {
  const [submitted, setIsSubmitted] = useState(false);

  const handleClick = () => {
    if (submitted) return;
    setIsSubmitted(true);
    submit();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <div className={s.text}>
        Thank you for completing this form! Please click the button below to
        submit!
      </div>
      <Button style={{ marginTop: 15 }} onClick={handleClick}>
        {submitted ? "Submitted!" : "Submit"}
      </Button>
      <Button style={{ marginTop: 10 }} variant="ghost" onClick={back}>
        Back
      </Button>
    </>
  );
};
