import Link from "next/link";
import s from "./navbar.module.scss";
import Logo from "./img/shardboundlogo.png";
import { StaticImage } from "../staticImage";

export const Navbar = () => {
  return (
    <div className={s.navbar}>
      <Link href={"/"} className={s.logo}>
        <StaticImage src={Logo} alt="" />
      </Link>
      <div className={s.nav}>
        <Link href={"/"} className={s.navLink}>
          Meet the Team
        </Link>
      </div>
    </div>
  );
};
