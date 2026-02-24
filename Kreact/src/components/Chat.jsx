import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import axios from "axios"
import createSocketConnection from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const user = useSelector((store) => store.user)
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const userId = user?._id
    const firstName = user?.firstName
    const photo = user?.photoUrl

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL+ "/chat/" + targetUserId, {withCredentials: true})

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            return {firstName: msg?.senderId?.firstName, lastName: msg?.senderId?.lastName, text: msg?.text}
        })

        setMessages(chatMessages)
    }

    useEffect(() => {
        fetchChatMessages()
    }, [])

    useEffect(() => {
        if(!userId) {return;}
        const socket = createSocketConnection()
        socket.emit("joinChat", {firstName,userId,targetUserId})

        socket.on("messageReceived", ({ firstName, text, photo }) => {
            console.log(firstName+ " : " +text);
            setMessages((messages) => [...messages, {firstName, text, photo}])
        });

            socket.on("errorMessage", (message) => {
              alert(message); // or setError(message)
            });


        return () => {
            socket.disconnect();
        } //it is called when the compo unmounts
    }, [userId, targetUserId])

    // if (!user) {
    //   return <div className="text-center p-10">Loading chat...</div>;
    // }

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {firstName, userId, targetUserId,photo ,text: newMessage})
        setNewMessage("")
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 rounded m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-400">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">{
                messages.map((msg, index) => {
                return (
                <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg?.photo}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg?.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
                </div>
            );
            })
            }</div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">  
                <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)} className="flex-1 bg-base-200 border border-gray-500 text-white rounded p-2" />
                <button onClick={sendMessage} className="btn btn-secondary">Send</button>
            </div>
        </div>
    );
}

export default Chat