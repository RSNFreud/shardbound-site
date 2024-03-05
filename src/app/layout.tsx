import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-tooltip/dist/react-tooltip.css";
import "./globals.scss";
import classNames from "classnames";
import { RenderLayout } from "@/_components/renderLayout/renderLayout";
import { Roboto } from "next/font/google";

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

const RobotoFont = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shardborne",
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
          RobotoFont.variable
        )}
      >
        <RenderLayout>{children}</RenderLayout>
      </body>
    </html>
  );
}
