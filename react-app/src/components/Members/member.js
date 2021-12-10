import React, { useState, useEffect } from "react";
import style from "./members.module.css";

export default function Member({ member, owner_id, card }) {
  const { image_url, id, username } = member;
  return (
    <>
      <div className={style.div1} tabIndex="1">
        <img src={image_url} alt="" />
        <span>
          {username}
          {owner_id && id === owner_id && "👑"}
        </span>

        {card && (
          <div className={style.card}>
            <img src={image_url} alt="" />
            <h3>{username}</h3>
          </div>
        )}
      </div>
    </>
  );
}
