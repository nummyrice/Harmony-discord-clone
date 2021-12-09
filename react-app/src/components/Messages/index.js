import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./messages.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as serverActions from '../../store/servers.js';

export default function ChannelMessages() {
    const {serverId, channelId} = useParams();
    const channel = useSelector(state => state.servers[serverId]?.channels?.[channelId]);
    const server = useSelector(state => state.servers?.[serverId])
    const [ messageInput, setMessageInput ] = useState('');
    const dispatch = useDispatch()
    function messageSubmit(e) {
        console.log('MESSAGE SUBMIT ENTERED', messageInput)
        e.preventDefault();
        if (!messageInput === '') {
            return dispatch(serverActions.postMessageThunk({content:e.target.value, server_id:server.id, channel_id:channel.id}))
        }
    }
    if (channel) {
        if (JSON.stringify(channel.messages) === '{}') {
            dispatch(serverActions.getMessagesThunk({ content: messageInput, server_id: serverId, channel_id: channelId }))
        }
    };
    const messages = channel?.messages
    return (
        <div className={style.channel_messages_container}>
            {server?.image_url && <img className={style.server_image} src={server.image_url}/>}
            {!server?.image_url &&<div className={style.server_image_placeholder}></div>}
            <div className={style.channel_welcome}>{channel?.name}</div>
            <div className={style.channel_welcome_message}>{`Welcome to the beginning of ${server?.name}.`}</div>
            {messages && Object.values(messages).map((message) => {
                return(
                    <div className={style.message_container} key={message.id}>
                        <img className={style.owner_image}src={message.owner.image_url}></img>
                        <div className={style.owner_username}>{message.owner.username}</div>
                        <div className={style.message_created_at}>{message.created_at}</div>
                        <div className={style.message_content}>{message.content}</div>
                    </div>
                )
            })}
            <form onSubmit={messageSubmit}>
                <div className={style.message_input_container}>
                    <input className={style.message_input_field}
                    type="text"
                    placeholder={`Message ${channel?.name} group`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}></input>
                </div>
            </form>
        </div>
    )
}
