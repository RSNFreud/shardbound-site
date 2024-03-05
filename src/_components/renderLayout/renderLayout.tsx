"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../navbar/navbar";
import { StaticImage } from "../staticImage";
import Background from "./img/background.png";

import s from "./renderLayout.module.scss";
import { Tooltip } from "react-tooltip";

export const RenderLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const isBlankLayout = path.includes("availabilities");

  return (
    <>
      {isBlankLayout ? (
        children
      ) : (
        <div className={s.wrapper}>
          <Navbar />
          {children}
          <StaticImage
            src={Background}
            alt=""
            priority
            fill
            className={s.background}
          />
        </div>
      )}
      <Tooltip id="tooltip" className={s.tooltip} />
    </>
  );
};
