import { io } from "socket.io-client"
const socket = io("http://localhost:3000/");
import Chat from "./chats";
import { useState } from "react";
import Button from '@mui/material/Button';
import "./chat.css"
export default function Chatapp(){
    let [username ,setusername] = useState("");
    let [room,setRoom]=useState("");
    let joinRoom = (event)=>{
        event.preventDefault();
        if(room.length && username.length){
            socket.emit("join-room",room);

        }
    }
    return(
    <div  className="main-con">
        <form className="ent-form">
            <input type="text" name="" className="ent-info"  onChange={(event)=>{setusername(event.target.value)}}  value={username} placeholder="username" />
            <input type="text" name="" className="ent-info"onChange={(event)=>{setRoom(event.target.value)}} value={room} placeholder="room id" />
            <Button type="submit"  variant="contained" onClick={joinRoom}>Join Room</Button>
        </form>
        <div>
            <Chat socket={socket} room={room} username={username}/> 
        </div>
    </div>)
}