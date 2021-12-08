import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./messages.module.css";

function Message() {
    return (
        <div></div>
    )
}

export default function ChannelMessages(channelId = 1) {
    const channelMessages = useSelector(state => state[channelId]);
    console.log(channelMessages);
    // useEffect()
    return (
        <div>
            <div className={style.channel_welcome}></div>
                <img className={style.channel_image}/>
                <div className={style.channel_welcome_message}></div>
        </div>
    )
}
