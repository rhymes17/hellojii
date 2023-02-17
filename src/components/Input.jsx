import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { BiImage } from "react-icons/bi"
import { ImAttachment } from "react-icons/im"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  // eslint-disable-next-line
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async() => {
      if(img){
        const storageRef = ref(storage, uuid());

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
            } catch (err) {
              console.log(err);
              setErr(true);
              // setLoading(false);
            }
          });
        });
      }else{
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now()
            })
          })
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId+ ".lastMessage"]: {
          text
        },
        [data.chatId +".date"] : serverTimestamp()
      })
      await updateDoc(doc(db, "userChats", data.user?.uid), {
        [data.chatId+ ".lastMessage"]: {
          text
        },
        [data.chatId +".date"] : serverTimestamp()
      })

      setText("");
      setImg();
  }

  const handleKey = e => {
    e.code === "Enter" && handleSend();
  }

  console.log(data.user?.displayName == null);

  return (
    <div className='input'>
      <input disabled={data.user?.displayName == null} type="text" placeholder='Type Something...' 
      value={text} onKeyDown={handleKey} onChange={e => setText(e.target.value)}/>
      <div className="send">
        <input type="file" style={{display: "none"}} id="file" onChange={e => setImg(e.target.files[0])}/>
        <label htmlFor='file' className='icon'>
          <ImAttachment />
          <BiImage/>
        </label>
        {data.user?.photoURL && <button onClick={handleSend}>Send</button>}
       
      </div>
    </div>
  )
}

export default Input