import Link from "next/link";
import s from "./navbar.module.scss";
import Logo from "./img/shardboundlogo.png";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className={s.navbar}>
      <Link href={"/"} className={s.logo}>
        <Image src={Logo} alt="" />
      </Link>
      <div className={s.nav}>
        <Link href={"/"} className={s.navLink}>
          Meet the Team
        </Link>
      </div>
    </div>
  );
};
