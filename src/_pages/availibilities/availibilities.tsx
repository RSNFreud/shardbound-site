"use client";
import { Input } from "@/_components/input/input";
import s from "./availibilities.module.scss";
import { Button } from "@/_components/button/button";
import { Suspense, useEffect, useState } from "react";
import {
  DEFAULT_TIME,
  TimePicker,
  TimeType,
} from "@/_components/timePicker/timepicker";
import { useAuthParams } from "./getSearchParams";
import { SummaryScreen } from "./summaryScreen";

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
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
  };

  return (
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
        onInput={handleInput}
        id="username"
        error={error}
      />
      <Button style={{ marginTop: 15 }} onClick={next}>
        Continue
      </Button>
    </>
  );
};

const GetContent = ({
  stage,
  back,
  next,
  data,
  errors,
  update,
  submit,
}: {
  back: () => void;
  next: () => void;
  stage: number;
  data: FormData;
  errors: { [key: string]: string };
  update: (key: string, value: any) => void;
  submit: () => void;
}) => {
  const field = STAGES[stage];
  switch (stage) {
    case 0:
      return (
        <Default
          onUpdate={(e) => update("username", e)}
          value={data.username}
          error={errors.username}
          next={next}
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
            label={`Enter your availability for ${field}`}
            value={(data as any)[field.toLowerCase()]}
            onUpdate={(e) => update(field.toLowerCase(), e)}
            next={next}
            back={back}
          />
        </>
      );
    case 8:
      return <SummaryScreen submit={submit} back={back} />;
  }
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const authKey = useAuthParams();

  const next = () => {
    if (!data.username) setErrors({ username: MISSING_DATA });
    return setStage((stage) => stage + 1);
  };

  const url = "https://shardborne.freud-online.co.uk/api/";
  // const url = "http://localhost:3333/api/";

  const submit = () => {
    const cleanData: { [key: string]: string } = {};

    Object.entries(data).map(([name, value]) => {
      if (typeof value === "string") return (cleanData[name] = value);
      value.map((e) => {
        delete e.error;
      });
      return (cleanData[name] = JSON.stringify(value));
    });

    fetch(`${url}save-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: cleanData, authKey: authKey }),
    });
  };

  useEffect(() => {
    if (!authKey) return setIsLoading(false);
    fetch(`${url}verify-member?authKey=${authKey}`)
      .then(async (e) => {
        if (e.status === 200) {
          if (e.headers.get("Content-Length") !== "0") {
            const storedData: string[] | undefined = await e.json();
            if (storedData) {
              const cleanData: { [key: string]: string } = {};

              Object.entries(storedData).map(([name, value]) => {
                if (name === "username") return (cleanData[name] = value);

                return (cleanData[name] = JSON.parse(value));
              });
              setData((rest) => ({ ...rest, ...cleanData }));
            }
          }
          setIsAuthed(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [authKey]);

  return (
    <Suspense>
      <div className={s.wrapper}>
        {isAuthed && (
          <div className={s.box}>
            <div
              className={s.title}
              style={{ marginBottom: stage === 0 || stage === 8 ? 0 : 20 }}
            >
              Shardborne Availability
            </div>
            <GetContent
              data={data}
              errors={errors}
              key={stage}
              stage={stage}
              back={() => setStage((stage) => stage - 1)}
              next={next}
              update={(key, value) => setData({ ...data, [key]: value })}
              submit={submit}
            />
          </div>
        )}
        {!isAuthed && !isLoading && (
          <div className={s.box}>
            Your auth key has expired! Please generate a new code by
            running&nbsp;
            <em>/generate-availabilities</em> in the Discord.
          </div>
        )}
      </div>
    </Suspense>
  );
};
