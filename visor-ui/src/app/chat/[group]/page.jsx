'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { v4 } from 'uuid'
import io from 'socket.io-client'
import { useSearchParams, usePathname } from 'next/navigation'
import Message from '@/components/Message'


const socket = io('http://localhost:3005')

export default function Page() {

    const [messageList, setMessageList] = useState([])

    const searchParams = useSearchParams()
    const usernameFromParams = searchParams.get('username')
    const [username, setUsername] = useState(usernameFromParams)

    const roomFromParams = usePathname().split('/')[2]
    const [room, setRoom] = useState(roomFromParams)

    useEffect(() => {
        if (room !== '') {
            socket.emit('join_room', room)
            console.log('joined room: ' + room)
            const messageContent = {
                id: 'join' + v4(),
                message: username + ' has joined the room',
                timestamp: Date.now(),
                room: room,
                author: username
            }
            socket.emit('send_message', messageContent)
            setMessageList((list) => [...list, messageContent])
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
            console.log(messageContent)
            setChatInput('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
            console.log(messageList)
        })
    }, [socket])



    return (
        <div className='page-container'>
            <div className='flex item-center justify-center'>
                <div className='flex text-2xl font-bold mt-12' style={{color: '#85C1B7'}}>    
                    Welc
                    <Image 
                        src="/visor_blue.svg" 
                        width={50} 
                        height={50}
                        className=''
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

                            
                            if (message.id.includes('join')) {
                                return (
                                    <div className='text-center text-gray-400 mt-2 mb-2'>
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

