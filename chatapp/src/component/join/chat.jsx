
import React, { useEffect , useState} from 'react';
import socketIOClient from 'socket.io-client';
import sendlogo from '../../asset/send.png';
import '../../style/chat.scss';
import {user} from "./join";
import Message from '../../component/join/message'
import ScrollToBottom from 'react-scroll-to-bottom'
import  closeicon from '../../asset/closeIcon.png'


const ENDPOINT = 'http://localhost:4500';

const Chat = () => {
  const [id, setid] = useState("");
  const [socket, setSocket] = useState(null);
  const [message, setmessage] = useState([]);

  const send= ()=>{
    const message= document.getElementById('inputtext').value;
    socket.emit('message',{message,id});
    document.getElementById('inputtext').value="";
    
  }

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setid(newSocket.id);
    });

    newSocket.emit('join', { user });

    newSocket.on('welcome', (data) => {  
     setmessage((prevMessages) => [...prevMessages, data]);
    console.log(data.user, data.message);
      
    });

    newSocket.on('userJoined', (data) => {
      setmessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    newSocket.on('userLeft',(data)=>{
      setmessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user,data.message);
    })

    return () => {
      newSocket.emit('notConnected');
      newSocket.off();
    };
  }, []);
  
  
  
  useEffect(() => {
    if (socket) {
      socket.on('sendmessage',(data)=>{
       
        setmessage((prevMessages) => [...prevMessages, data]);
        console.log(data.user,data.message,data.id)
      })
    }

    return () => {
      if (socket) {
        socket.off('sendmessage');
      }
    };
  }, [socket]);


  return (
    <div className="chatpage">
      <div className="chatcontainer">
        <div className="header">
        <h2>Chat</h2>
       <a href="/"> <img src={closeicon} alt="close" /></a>

        </div>
        <ScrollToBottom className="chatbox">
         {message.map((item,i)=>  <Message key ={i} user={item.id===id?``:item.user} Message={item.message} classs={item.id===id?`right`:`left`}/>)}
        </ScrollToBottom>
        <div className="inputbox">
          <input type="text" id="inputtext" />
          <button className="btn" onClick={send}>
            <img src={sendlogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

