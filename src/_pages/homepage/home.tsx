"use client";

import { useState } from "react";
import s from "./home.module.scss";
import classNames from "classnames";
import { TEAM_MEMBERS, roles } from "./constants";

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
              <div className={s.profilePic}></div>
              <div className={s.name}>{member.name}</div>
              <div className={s.location}>{member.location}</div>
              <div className={s.memberRole}>{member.role}</div>
              <div className={s.icons}></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
