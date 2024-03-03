"use client";
import { Input } from "@/_components/input/input";
import s from "./availibilities.module.scss";
import { Button } from "@/_components/button/button";
import { useState } from "react";
import {
  DEFAULT_TIME,
  TimePicker,
  TimeType,
} from "@/_components/timePicker/timepicker";

type FormData = {
  username: string;
  monday: TimeType[];
  tuesday: TimeType[];
  wednesday: TimeType[];
  thursday: TimeType[];
  friday: TimeType[];
  sunday: TimeType[];
};

const MISSING_DATA = "Please fill out this field!";
const STAGES = [
  "USERNAME",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const Default = ({
  onUpdate,
  value,
  next,
  error,
}: {
  onUpdate: (name: string) => void;
  value?: string;
  error?: string;
  next: () => void;
}) => (
  <>
    <div className={s.text}>
      This form is used to add/update your availability while working on the
      Shardborne modpack.
    </div>
    <div className={s.subtext}>
      Note that we will not hold you to these times. These simply make it
      significantly easier to know when you are available and able to dedicate
      time to the project.
    </div>
    <div className={s.seperator} />
    <Input
      label="Enter your username/nickname:"
      value={value}
      onInput={(e) => onUpdate((e.target as any).value)}
      id="username"
      autoFocus
      error={error}
    />
    <Button style={{ marginTop: 15 }} onClick={next}>
      Continue
    </Button>
  </>
);

export const Availibilities = () => {
  const [stage, setStage] = useState(0);

  const [data, setData] = useState<FormData>({
    username: "",
    monday: DEFAULT_TIME,
    tuesday: DEFAULT_TIME,
    wednesday: DEFAULT_TIME,
    thursday: DEFAULT_TIME,
    friday: DEFAULT_TIME,
    sunday: DEFAULT_TIME,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndContinueText = (field: string) => {
    if (!(data as any)[field])
      return setErrors((e) => ({
        ...e,
        [field]: MISSING_DATA,
      }));
    else
      setErrors((e) => ({
        ...e,
        [field]: "",
      }));
    return setStage((stage) => stage + 1);
  };

  const continueDate = () => {
    setStage((stage) => stage + 1);
  };

  const submit = () => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const GetContent = () => {
    const field = STAGES[stage];
    switch (stage) {
      case 0:
        return (
          <Default
            onUpdate={(e) =>
              setData((rest) => ({
                ...rest,
                username: e,
              }))
            }
            value={data.username}
            error={errors.username}
            next={() => validateAndContinueText("username")}
          />
        );
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <>
            <TimePicker
              label={`Enter your availibilty for ${field}`}
              value={data[field.toLowerCase()]}
              onUpdate={(e) =>
                setData((rest) => ({
                  ...rest,
                  [field.toLowerCase()]: e,
                }))
              }
              next={continueDate}
              back={() => setStage((stage) => stage - 1)}
            />
          </>
        );
      default:
        return (
          <>
            <div className={s.text}>
              Thank you for completing this form! Please click the button below
              to submit!
            </div>
            <Button style={{ marginTop: 15 }} onClick={submit}>
              Submit
            </Button>
            <Button
              style={{ marginTop: 10 }}
              variant="ghost"
              onClick={() => setStage((stage) => stage - 1)}
            >
              Back
            </Button>
          </>
        );
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.box}>
        <div
          className={s.title}
          style={{ marginBottom: stage === 0 || stage === 8 ? 0 : 20 }}
        >
          Shardborne Availibility
        </div>
        <GetContent />
      </div>
    </div>
  );
};