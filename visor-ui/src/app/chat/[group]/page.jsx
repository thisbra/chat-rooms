'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { v4 } from 'uuid'
import io from 'socket.io-client'
import { useSearchParams, usePathname } from 'next/navigation'
import Message from '@/components/Message'
import axios from 'axios'


const socket = io(process.env.NEXT_PUBLIC_SOCK_URL)

export default function Page() {

    const [isLoading, setIsLoading] = useState(false)

    const [messageList, setMessageList] = useState([])

    const searchParams = useSearchParams()
    const usernameFromParams = searchParams.get('username')
    const [username, setUsername] = useState(usernameFromParams)

    const roomFromParams = usePathname().split('/')[2]
    const [room, setRoom] = useState(roomFromParams)

    useEffect(() => {
        if (room !== '') {

            socket.emit('join_room', room)
            const messageContent = {
                id: 'join' + v4().slice(4),
                message: username + ' has joined the room',
                timestamp: Date.now(),
                room: room,
                author: username
            }

            const fetchRoom = async () => {
                try {
                    const roompath = process.env.NEXT_PUBLIC_API_URL + '/rooms/name/' + room
                    const roomresponseGET = await axios.get(roompath)
                    if (roomresponseGET.data === null) {
                        const roomresponsePOST = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/rooms', {
                            roomId: v4(),
                            name: room,
                        })

                        const roomCreatedMessageContent = {
                            id: 'created' + v4().slice(7),
                            message: 'Room ' + room + ' has been created!',
                            timestamp: Date.now(),
                            room: room,
                            author: username
                        }
                        socket.emit('send_message', roomCreatedMessageContent)
                        setMessageList((list) => [...list, roomCreatedMessageContent])
                    }

                    if (roomresponseGET.data !== null) {
                        const messagespath = process.env.NEXT_PUBLIC_API_URL + '/messages/room/' + room
                        const messagesresponseGET = await axios.get(messagespath)
                        const messageHistory = messagesresponseGET.data
                        const msgList = []
                        messageHistory.forEach(message => {
                            delete message._id
                            delete message.__v
                            message.id = message.messageId
                            message.message = message.content
                            msgList.push(message)
                        })
                        
                        setMessageList(msgList)
                    }
                } catch (error) {
                    console.log(error)
                }

                socket.emit('send_message', messageContent)
                setMessageList((list) => [...list, messageContent])
            }
            fetchRoom()

        }
      }, [])

    const [chatinput, setChatInput] = useState('')

    const handleSend = async () => {
        if (chatinput) {
            const messageContent = {
                id: v4(),
                author: username,
                room: room,
                message: chatinput,
                timestamp: Date.now()
            }

            await socket.emit('send_message', messageContent)
            setMessageList((list) => [...list, messageContent])
            setChatInput('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    if (isLoading) {
        <div>Loading...</div>
    }


    if (!isLoading) {
    return (
        <div className='page-container'>
            <div className='flex item-center justify-center'>
                <div className='flex text-2xl font-bold mt-12' style={{color: '#85C1B7'}}>    
                    Welc
                    <Image 
                        src="/visor_blue.svg" 
                        width={50} 
                        height={50}
                        className='visor-logo'
                        alt='visorai logo'
                        >
                        </Image>
                    me to {room}, 
                    {' ' + username}
                </div>
            </div>
            <div className='flex item-center justify-center'>
                <div className='chat-container mt-10 flex flex-col items-center h-screen'>
                    
                    <div className='flex-grow  w-full message-container-overflow'>
                        {messageList.map((message, index) => {

                            if (message.id.includes('join') || message.id.includes('created')) {
                                return (
                                    <div className='text-center text-gray-400 mt-2 mb-2' key={index}>
                                        {message.message}
                                    </div>
                                )
                            } 
                            else {

                                return (
                                    <Message
                                    key={message.id}
                                    isAuthor={message.author === username}
                                    content={message.message}
                                    author={
                                        index = 0 ? message.author : (messageList[index - 1].author === message.author ? '' : message.author)
                                    }
                                    timestamp={message.timestamp}
                                    />
                                )

                            }
                        
                        }
                        )}
                    </div>

                    <div className='flex w-full grid grid-cols-12 mb-3 pt-2'>
                        <input
                            type='text'
                            id='chatinput'
                            placeholder='Type a message...'
                            value={chatinput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSend();
                                }
                              }}
                            className='input-field col-span-11 ml-3'
                            /> 
                        <button
                            className=''
                            onClick={handleSend}
                            >
                                <Image 
                                    src="/send_arrow.png" 
                                    width={20} 
                                    height={20}
                                    className='ml-3'
                                    alt='visorai logo'
                                    >
                                    </Image>
                            </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
  
}
}

