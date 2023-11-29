"use client";

import { useState } from "react";
import s from "./home.module.scss";
import classNames from "classnames";
import { TEAM_MEMBERS, roles } from "./constants";
import Link from "next/link";
import { FaDiscord, FaTwitch, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { StaticImage } from "@/_components/staticImage";

export const Home = () => {
  const [activeRole, setActiveRole] = useState("Development Managers");

  return (
    <div className={s.pageWrapper}>
      <div className={s.roleChooser}>
        {roles.map((role, count) => (
          <button
            className={classNames(s.role, { [s.active]: role === activeRole })}
            key={count}
            onClick={() => setActiveRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className={s.grid}>
        {TEAM_MEMBERS.filter((member) => member.group === activeRole).map(
          (member) => (
            <div className={s.teamMember} key={member.name}>
              <div className={s.profilePic}>
                {typeof member.image !== "undefined" && (
                  <StaticImage src={member.image} alt="" fill />
                )}
              </div>
              <div className={s.name}>{member.name}</div>
              <div className={s.location}>{member.location}</div>
              <div className={s.memberRole}>{member.role}</div>
              <div className={s.icons}>
                {Boolean(member.discord) && (
                  <Link
                    href={`https://discord.com/users/${member.discord}`}
                    target="_blank"
                  >
                    <FaDiscord />
                  </Link>
                )}
                {Boolean(member.twitter) && (
                  <Link
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                  >
                    <FaXTwitter />
                  </Link>
                )}
                {Boolean(member.twitch) && (
                  <Link
                    href={`https://twitch.com/${member.twitch}`}
                    target="_blank"
                  >
                    <FaTwitch />
                  </Link>
                )}
                {Boolean(member.youtube) && (
                  <Link
                    href={`https://youtube.com/${member.youtube}`}
                    target="_blank"
                  >
                    <FaYoutube />
                  </Link>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
