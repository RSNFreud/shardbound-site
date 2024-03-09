"use client";
import { useEffect, useRef, useState } from "react";
import s from "./availibilityGrid.module.scss";
import classNames from "classnames";
import {
  TimeType,
  addLeadingZero,
  getLocaleHour,
  getUTCHour,
} from "@/_components/timePicker/timepicker";

const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

type DataType = {
  username: string;
  monday: string | TimeType[];
  tuesday: string | TimeType[];
  wednesday: string | TimeType[];
  thursday: string | TimeType[];
  friday: string | TimeType[];
  saturday: string | TimeType[];
  sunday: string | TimeType[];
};

export const AvailibilityGrid = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [data, setData] = useState<DataType[]>();
  const slider = useRef<HTMLDivElement>(null);
  let startX: number;
  let scrollLeft: number;
  let isDown = false;

  useEffect(() => {
    fetch("https://shardborne.freud-online.co.uk/api/get-times")
      .then(async (e) => {
        if (e.ok) {
          const res = await e.json();
          setData(resolveData(res));
        }
      })
      .catch();
  }, []);

  const startScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slider.current) return;
    startX = e.pageX - slider.current.offsetLeft;
    scrollLeft = slider.current.scrollLeft;
    isDown = true;
  };
  const moveScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slider.current || !isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX;
    slider.current.scrollLeft = scrollLeft - walk;
  };

  const getDate = (time: string) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setUTCHours(parseInt(hour));
    date.setUTCMinutes(parseInt(minute));
    return date;
  };

  const resolveData = (data: DataType[]) => {
    const finalData: DataType[] = [];
    data.map((day) => {
      const user = day.username;

      const dayData: DataType = {
        username: user,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        sunday: [],
        saturday: [],
      };

      let excessTime: string;

      Object.entries(day).map(([key, value], count) => {
        if (key === "username") return null;
        const times: TimeType[] = JSON.parse(value as string);
        if (count === Object.entries(day).length - 1 && excessTime?.length) {
          dayData.monday = [
            ...(dayData.monday as TimeType[]),
            { startTime: getUTCHour("00:00"), endTime: excessTime },
          ];
          excessTime = "";
        }
        if (excessTime?.length) {
          times.push({ startTime: getUTCHour("00:00"), endTime: excessTime });
          excessTime = "";
        }
        times.map((time) => {
          const start = getDate(time.startTime);
          const end = getDate(time.endTime);

          if (
            start.getHours() > end.getHours() &&
            start.getTime() > end.getTime()
          ) {
            end.setDate(end.getDate() + 1);
            excessTime = `${addLeadingZero(end.getUTCHours())}:${addLeadingZero(
              end.getUTCMinutes()
            )}`;
          }
          if (end.getDate() > start.getDate()) {
            excessTime = `${addLeadingZero(end.getUTCHours())}:${addLeadingZero(
              end.getUTCMinutes()
            )}`;
          }
          if (!(dayData as any)[key]) (dayData as any)[key] = [time];
          else
            (dayData as any)[key] = [
              ...((dayData as any)[key] as TimeType[]),
              time,
            ];
        });
      });
      finalData.push(dayData);
    });
    return finalData;
  };

  if (!data || !data.length) return null;

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.box}>
          <div className={s.titleWrapper}>
            <div className={s.title}>Shardborne Availability</div>
            <div className={s.days}>
              {days.map((day, count) => (
                <div
                  onClick={() => setActiveDay(count)}
                  className={classNames(s.day, {
                    [s.active]: day === days[activeDay],
                  })}
                  key={day}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className={s.grid}>
            <div className={s.usernames}>
              {data?.map((e) => {
                const { username } = e;
                const dayData: TimeType[] = (e as any)[
                  days[activeDay].toLowerCase()
                ];

                return (
                  <div
                    className={classNames(s.username, {
                      [s.unavailable]: Boolean(
                        dayData.filter(
                          ({ startTime, endTime }) => !startTime || !endTime
                        ).length
                      ),
                    })}
                    key={username}
                  >
                    {username}
                  </div>
                );
              })}
            </div>
            <div
              ref={slider}
              className={s.itemsWrapper}
              onMouseDown={startScroll}
              onMouseLeave={() => (isDown = false)}
              onMouseUp={() => (isDown = false)}
              onMouseMove={moveScroll}
            >
              {data.map((e) => {
                const dayData: TimeType[] = (e as any)[
                  days[activeDay].toLowerCase()
                ];
                return (
                  <div className={s.row} key={e.username}>
                    {dayData
                      .sort((a, b) =>
                        getDate(a.startTime).getHours() >
                        getDate(b.startTime).getHours()
                          ? 0
                          : -1
                      )
                      .map((item) => {
                        if (!item.startTime || !item.endTime) return;

                        return (
                          <div
                            className={s.available}
                            key={`${e.username}-${item.startTime}`}
                          >
                            {getLocaleHour(item.startTime)} -{" "}
                            {getLocaleHour(item.endTime)}
                            {item.comment && (
                              <div
                                className={s.comment}
                                data-tooltip-id={"tooltip"}
                                data-tooltip-content={item.comment}
                              >
                                !
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
