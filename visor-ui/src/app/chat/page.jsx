'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import axios from 'axios';
import { v4 } from 'uuid';


export default function Page() {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    const router = useRouter()


    const handleForm = async (e) => {
        e.preventDefault()

        if (username && room) {
            const userpath = process.env.NEXT_PUBLIC_API_URL + '/users/username/' + username
            const userresponseGET = await axios.get(userpath)
            if (userresponseGET.data === null) {
                const userresponsePOST = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/users', {
                    userId: v4(),
                    username: username,
                })
            }

            router.push(`/chat/${room}?username=${username}`)
            
        }
    }

   
    return (
        <div className='page-container'>
            <div className='flex item-center justify-center'>
                <a target='_blank' href='https://visor.ai'>
                    <Image 
                        src="/visor_blue.svg" 
                        width={70} 
                        height={70}
                        className='mt-40 visor-logo'
                        alt='Visor.ai logo'
                        >
                        </Image>
                </a>

            </div>
            <div className='flex item-center justify-center'>
                <div className='card-container mt-16 flex flex-col items-center'>
                    <div className='text-xl mt-5 font-bold'>
                        Join a chat room
                    </div>

                    <div className='mt-8'>
                        <form onSubmit={handleForm}>
                            <div>
                                <label 
                                    htmlFor='username'
                                    className='mr-6' 
                                    >Username:</label> 
                                <input
                                    type='text'
                                    id='username'
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='input-field w-50'
                                    /> 
                            </div>
                            
                            <div className='mt-4'>
                                <label 
                                    htmlFor='room'
                                    className='mr-14' 
                                    >Room:</label> 
                                <input
                                    type='text'
                                    id='room'
                                    required
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                    className='input-field w-50'
                                    /> 
                            </div>


                            <div className='flex item-center justify-center mt-8'>
                                <button
                                    type='submit'
                                    className='button-main font-bold'
                                    >Join</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  
}

