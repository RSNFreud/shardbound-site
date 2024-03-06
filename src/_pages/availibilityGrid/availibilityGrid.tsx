"use client";
import { useEffect, useRef, useState } from "react";
import s from "./availibilityGrid.module.scss";
import classNames from "classnames";
import {
  TimeType,
  addLeadingZero,
  getLocaleHour,
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
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  sunday: string;
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
          setData(res);
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
                const dayData = JSON.parse(
                  (e as any)[days[activeDay].toLowerCase()]
                ) as TimeType[];
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
              <div className={s.times}>
                {Array.from({ length: 24 }).map((_, count) => (
                  <div className={s.time} key={count}>
                    {addLeadingZero(count)}:00
                  </div>
                ))}
              </div>

              {data.map((e) => {
                const dayData = JSON.parse(
                  (e as any)[days[activeDay].toLowerCase()]
                ) as TimeType[];
                return (
                  <div className={s.row} key={e.username}>
                    {dayData.map((item) => {
                      if (!item.startTime || !item.endTime) return;
                      const start = getDate(item.startTime);
                      const end = getDate(item.endTime);

                      const diff = Math.round(
                        Math.abs(start.getTime() - end.getTime()) / 36e5
                      );
                      let excess = 0;
                      let endTime = getLocaleHour(item.endTime);

                      if (end.getDate() !== start.getDate()) {
                        if (end.getHours() === 0) excess = 0;
                        else excess = end.getHours();
                      }

                      const width = (diff - excess) * 50;
                      const left = start.getHours() * 50;

                      return (
                        <div
                          className={s.available}
                          style={{ left, width }}
                          key={`${e.username}-${item.startTime}`}
                        >
                          {getLocaleHour(item.startTime)} - {endTime}
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
