import { useState ,useEffect } from "react"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
export default function Chat({socket , username ,room}){
    let [currMessage,setcurrMessage] = useState("");
    let [msg,setMsg] = useState([]);

    useEffect(()=>{
        let msgConatiner = (data)=>{
            setMsg((prevMsg)=>[...prevMsg,data]);
        }
        socket.on("recived",msgConatiner);
        return ()=>{
            socket.off("recived",msgConatiner)
        }
},[socket])
    let Sendmsg  = async(event)=>{
        event.preventDefault();
        if(currMessage.length){
            let data = {
                author: username,
                room :room,
                message:currMessage,
                time:new Date().toLocaleTimeString()
            }
            await socket.emit("send",data)
             setMsg((prevMsg)=>[...prevMsg,data]); 
            
        }
    }
    return(<div className="flex gap-2 chat-con">
    <div className="chats-list">
            <ul className="chats">
            {msg.map((msg,ind)=><>
            <li className={username===msg.author?"you":"someone"} key={ind}>
                <p>{msg.message}</p>
                <p className="chat-time">{msg.time}</p>
            </li></>)}
            </ul>
    </div>
    <div className="chat-send">
        <input type="text" className="ent-info" placeholder="hey !!!" onChange={(event)=>{setcurrMessage(event.target.value)}} />
        <Button variant="contained" onClick={Sendmsg} endIcon={<SendIcon />}>Send</Button>
    </div>
    </div>)
}