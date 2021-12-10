import { useParams } from "react-router-dom";
import style from "./messages.module.css";
import * as serverActions from '../../store/servers.js';
import { useDispatch } from 'react-redux';



export default function ConfirmDeleteModal({setDisplayDeleteConfirm, message}) {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();
    function handleMessageDelete() {
        console.log(message.id)
        dispatch(serverActions.deleteMessageThunk({server_id: serverId, channel_id: channelId, message_id: message.id}))
        setDisplayDeleteConfirm('')
    }
    return(
        <div className={style.grey_modal_background}>
            <div className={style.delete_message_modal}>
                <div className={style.delete_message_title}>Delete Message</div>
                <div className={style.delete_message_question}>Are you sure you want to delete this message?</div>
                <div className={style.delete_message_card}>
                    <img className={style.owner_image} alt={'avatar'} src={message.owner.image_url}></img>
                    <div className={style.owner_username}>{message.owner.username}</div>
                    <div className={style.message_created_at}>{message.created_at}</div>
                    <div className={style.message_content}>{message.content}</div>
                </div>
                <div className={style.delete_message_buttons}>
                    <button className={style.cancel_button} onClick={() => setDisplayDeleteConfirm('')}>Cancel</button>
                    <button className={style.delete_button} onClick={handleMessageDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
};
