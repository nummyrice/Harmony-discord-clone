import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./messages.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/servers.js";
import ConfirmDeleteModal from "./confirmDeleteModal";

export default function ChannelMessages() {
  const { serverId, channelId } = useParams();

  const server = useSelector((state) => state.servers?.[serverId]);
  const channel = server?.channels?.[channelId];
  let messages = useSelector(
    (state) => state.servers?.[serverId]?.channels?.[channelId]?.messages
  );

  const sessionUser = useSelector((state) => state.session?.user);
  const [messageInput, setMessageInput] = useState("");
  const [editMessageInput, setEditMessageInput] = useState({
    id: undefined,
    value: "",
  });
  const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState("");
  const dispatch = useDispatch();
  console.log({ server, channelId });
  // SUBMIT NEW MESSAGE
  function messageSubmit(e) {
    e.preventDefault();
    if (messageInput !== "") {
      setMessageInput("");
      return dispatch(
        serverActions.postMessageThunk({
          content: messageInput,
          server_id: serverId,
          channel_id: channelId,
        })
      );
    }
  }

  // SUBMIT EDITED MESSAGE
  function editMessageSubmit(e) {
    e.preventDefault();
    if (editMessageInput.value !== "") {
      setEditMessageInput({ id: undefined, value: "" });
      // is there a better way to get the message ID?
      return dispatch(
        serverActions.editMessageThunk({
          content: editMessageInput.value,
          server_id: server.id,
          channel_id: channel.id,
          message_id: editMessageInput.id,
        })
      );
    }
  }

  // Prevents message store without channel store
  if (channel) {
    if (JSON.stringify(channel.messages) === "{}") {
      dispatch(
        serverActions.getMessagesThunk({
          server_id: serverId,
          channel_id: channelId,
        })
      );
    }
  }
  const scroll = () => {
    let i = document.getElementById("scroll");
    if (i) i.scrollIntoView();
  };
  useEffect(() => {
    scroll();
  }, [server, channel, messages]);

  // obtains messages from the store
  return (
    <div className={style.div1}>
      <div className={style.channel_messages_container}>
        {server?.image_url && (
          <img
            alt={"avatar"}
            className={style.server_image}
            src={server.image_url}
          />
        )}
        {!server?.image_url && (
          <div className={style.server_image_placeholder}></div>
        )}
        <div className={style.channel_welcome}>{channel?.name}</div>
        <div
          className={style.channel_welcome_message}
        >{`Welcome to the beginning of ${server?.name}.`}</div>
        {messages &&
          Object.values(messages).map((message) => {
            return (
              <div className={style.message_container} key={message.id}>
                <img
                  alt={"avatar"}
                  className={style.owner_image}
                  src={message.owner.image_url}
                ></img>
                <div className={style.owner_username}>
                  {message.owner.username}
                </div>
                <div className={style.message_created_at}>
                  {message.created_at}
                </div>
                {message.owner_id === sessionUser?.id && (
                  <div className={style.message_options}>
                    <div
                      id={message.id}
                      className={style.message_edit}
                      onClick={(e) => {
                        setEditMessageInput({
                          id: message.id,
                          value: message.content,
                        });
                      }}
                    >
                      <svg
                        id={message.id}
                        class="icon-LYJorE"
                        aria-hidden="false"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div
                      id={message.id}
                      className={style.message_delete}
                      onClick={(e) => {
                        setDisplayDeleteConfirm(message.id);
                      }}
                    >
                      <svg
                        class="icon-LYJorE"
                        aria-hidden="false"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
                {!(parseInt(editMessageInput.id, 10) === message.id) && (
                  <div className={style.message_content}>{message.content}</div>
                )}
                {parseInt(editMessageInput.id, 10) === message.id && (
                  <>
                    <form onSubmit={editMessageSubmit}>
                      <input
                        className={style.edit_message_input_field}
                        type="text"
                        value={editMessageInput.value}
                        onChange={(e) =>
                          setEditMessageInput({
                            id: editMessageInput.id,
                            value: e.target.value,
                          })
                        }
                      ></input>
                      <div
                        className={style.edit_message_cancel}
                        onClick={() =>
                          setEditMessageInput({ id: undefined, value: "" })
                        }
                      >
                        {" "}
                        Cancel
                      </div>
                    </form>
                  </>
                )}
                {parseInt(displayDeleteConfirm, 10) === message.id && (
                  <ConfirmDeleteModal
                    setDisplayDeleteConfirm={setDisplayDeleteConfirm}
                    message={message}
                  />
                )}
              </div>
            );
          })}
        <i id="scroll"></i>
      </div>
      {!editMessageInput.value && (
        <form
          onSubmit={(e) => {
            messageSubmit(e);
            scroll();
          }}
        >
          <div className={style.message_input_container}>
            <input
              className={style.message_input_field}
              type="text"
              placeholder={`Message ${channel?.name} group`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            ></input>
          </div>
        </form>
      )}
    </div>
  );
}
