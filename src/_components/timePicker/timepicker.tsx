import { useEffect, useState } from "react";
import { Label } from "../label/label";
import s from "./timepicker.module.scss";
import { Button } from "../button/button";

type PropsType = {
  label: string;
  error?: string;
  value?: TimeType[];
  onUpdate: (times: TimeType[]) => void;
  next: () => void;
  back: () => void;
};

export type TimeType = {
  startTime: string;
  endTime: string;
  error?: string;
};

export const DEFAULT_TIME = [{ startTime: "", endTime: "", error: "" }];

export const TimePicker = ({
  label,
  error,
  value,
  onUpdate,
  next,
  back,
}: PropsType) => {
  const [times, setTimes] = useState<TimeType[]>(value || DEFAULT_TIME);

  const updateTime = (key: string, value: string, count: number) => {
    setTimes((current) =>
      current.map((item, index) =>
        index === count ? { ...item, [key]: value } : item
      )
    );
  };

  const deleteItem = (index: number) => {
    setTimes(times.filter((_, count) => count !== index));
  };

  useEffect(() => {
    setTimes(value || DEFAULT_TIME);
  }, [value]);

  const addTimeslot = () => {
    setTimes((rest) => [...rest, ...DEFAULT_TIME]);
  };

  const handleBack = () => {
    onUpdate(times);
    back();
  };

  const handleContinue = () => {
    const hasErrors = times.filter((time, index) => {
      const start = generateTimestamp(time.startTime);
      const end = generateTimestamp(time.endTime);
      if (time.startTime && !time.endTime) {
        updateTime("error", "Please choose a valid set of times", index);
        return time;
      }
      if (start.getTime() > end.getTime()) {
        updateTime("error", "Please choose a valid set of times", index);
        return time;
      }
      updateTime("error", "", index);
    });
    if (hasErrors.length) return;
    onUpdate(times);
    next();
  };

  const generateTimestamp = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    return date;
  };

  return (
    <div>
      <Label text={label} />
      <div className={s.times}>
        {times?.map(({ startTime, endTime, error }, count) => (
          <div key={count}>
            <div className={s.rowWrapper}>
              <div className={s.row}>
                <input
                  type="time"
                  className={s.input}
                  value={startTime}
                  onInput={(e) =>
                    updateTime("startTime", (e.target as any).value, count)
                  }
                />
                <input
                  type="time"
                  className={s.input}
                  value={endTime}
                  onInput={(e) =>
                    updateTime("endTime", (e.target as any).value, count)
                  }
                />
              </div>
              {count !== 0 && (
                <div className={s.delete} onClick={() => deleteItem(count)}>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </div>
            {count === times.length - 1 && (
              <div className={s.addTime} onClick={addTimeslot}>
                Add timeslot
              </div>
            )}
            {error && <div className={s.error}>{error}</div>}
          </div>
        ))}
      </div>
      {error && <div className={s.error}>{error}</div>}
      <Button style={{ marginTop: 15 }} onClick={handleContinue}>
        Continue
      </Button>
      <Button style={{ marginTop: 10 }} variant="ghost" onClick={handleBack}>
        Back
      </Button>
    </div>
  );
};