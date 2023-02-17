import React, { useContext } from 'react'
import {BiDotsHorizontalRounded} from "react-icons/bi"
import {BsCameraVideoFill} from "react-icons/bs"
import {AiOutlineUserAdd} from "react-icons/ai"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
      {data.user?.photoURL && <img className="chat_img" src={data.user?.photoURL} alt="" />}
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsCameraVideoFill />
          <AiOutlineUserAdd />
          <BiDotsHorizontalRounded/>
        </div>
      </div>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat