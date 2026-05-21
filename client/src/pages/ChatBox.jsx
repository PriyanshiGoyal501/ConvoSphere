import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { addMessage, fetchMessages, resetMessages } from "../features/messages/messagesSlice";
// import { connection } from "mongoose";

const ChatBox = () => {
  const {messages}= useSelector((state) => state.messages)
  const { userId } = useParams()
  const { getToken }= useAuth()
  const  dispatch = useDispatch()
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const messagesEndRef = useRef(null);

  const connections = useSelector((state) => state.connections.connections)

  const fetchUserMessages =async () => {
    try {
      const token = await getToken()
      dispatch(fetchUserMessages({token, userId}))
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  const sendMessage = async () => {

    try {
      if(!text && !image) return

      const token = await getToken()
      const formData = new FormData();
      formData.append('to_user_id', userId)
      formData.append('text', text);
      image && formData.append('image', image);

      const { data } = await api.post('/api/message/send', formData,{
        headers: {Authorization: `Bearer ${token}`}
      
    })
    if(data.success){
      setText('')
      setImage(null)
      dispatch(addMessage(data.message))
    } else{
      throw new Error(data.message)
    }}catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchUserMessages()
    return () => {
      dispatch(resetMessages())
    }

  },[userId])

  useEffect(() => {
    if(connections.length > 0){
      const user = connections.find(connection => connection._id === userId)
      setUser(user)
    }
  },[messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-3 md:px-10 xl:px-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300">
        <img
          src={user.profile_picture}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-gray-800">
            {user.full_name}
          </p>

          <p className="text-sm text-gray-500">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 md:px-10">
        <div className="space-y-4 max-w-4xl mx-auto">

          {[...messages]
            .sort(
              (a, b) =>
                new Date(a.createdAt) -
                new Date(b.createdAt)
            )
            .map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.to_user_id !== user.id
                    ? "items-start"
                    : "items-end"
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">
                  {message.to_user_id !== user.id
                    ? "Connection"
                    : "You"}
                </p>

                <div
                  className={`p-3 text-sm max-w-sm rounded-2xl shadow bg-white text-slate-700 ${
                    message.to_user_id !== user.id
                      ? "rounded-bl-none"
                      : "rounded-br-none bg-indigo-500 text-black"
                  }`}
                >
                  {message.message_type === "image" && (
                    <img
                      src={message.media_url}
                      alt="message"
                      className="w-64 max-w-full object-cover rounded-lg mb-2"
                    />
                  )}

                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-300 bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">

          {/* Image Upload */}
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-lg">
            📷
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </label>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-black px-5 py-2 rounded-lg"
          >
            Send
          </button>
        </div>

        {/* Selected Image Preview */}
        {image && (
          <div className="max-w-4xl mx-auto mt-3">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;