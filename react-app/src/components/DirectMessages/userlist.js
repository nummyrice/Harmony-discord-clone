import React, { useState, useEffect } from "react";

import style from "./directmessages.module.css";
import Member from "../Members/member";
import * as serverActions from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const session = useSelector((state) => state.session);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/@me");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  async function privateServer(member) {
    console.log(member);
    let server = await dispatch(
      serverActions.postServerThunk({
        name: "DM server",
        isPrivate: true,
        owner_id: session.id,
      })
    );
    dispatch(serverActions.postPrivateMemberThunk(server.id, member.id));
  }

  return (
    <div className={style.main}>
      {users?.map((member) => (
        <div onClick={() => privateServer(member)}>
          <Member key={member.id} member={member} />
        </div>
      ))}
    </div>
  );
}
