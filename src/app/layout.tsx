import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import classNames from "classnames";
import { Navbar } from "@/_components/navbar/navbar";
import s from "./layout.module.scss";
import Background from "./img/background.png";
import { StaticImage } from "@/_components/staticImage";

// Font files can be colocated inside of `app`
const Minecrafter = localFont({
  src: [
    {
      path: "./fonts/minecrafter_alt.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/minecraft_reg.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-minecrafter",
});
const MinecraftTen = localFont({
  src: [
    {
      path: "./fonts/minecraft_ten.ttf",
      weight: "regular",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-minecraft-ten",
});

export const metadata: Metadata = {
  title: "Shardbound",
  robots: "norobots",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          Minecrafter.variable,
          MinecraftTen.variable,
          s.wrapper
        )}
      >
        <Navbar />
        {children}
        <StaticImage
          src={Background}
          alt=""
          priority
          fill
          className={s.background}
        />
      </body>
    </html>
  );
}
