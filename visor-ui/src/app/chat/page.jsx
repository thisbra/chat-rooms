'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Page() {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    const handleForm = (e) => {
        e.preventDefault()
        console.log(username)
    }

   
    return (
        <div className='page-container'>
            <div className='flex item-center justify-center'>
                <Image 
                    src="/visor_blue.svg" 
                    width={50} 
                    height={50}
                    className='mt-40'
                    >
                    </Image>

            </div>
            <div className='flex item-center justify-center'>
                <div className='card-container mt-16 flex flex-col items-center'>
                    <div className='text-xl mt-4'>
                        Join a chat room
                    </div>

                    <div className='mt-8'>
                        <form action={handleForm}>
                            <div>
                                <label 
                                    htmlFor='username'
                                    className='mr-5' 
                                    >Username:</label> 
                                <input
                                    type='text'
                                    id='username'
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='input-field'
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
                                    className='input-field'
                                    /> 
                            </div>


                            <div className='flex item-center justify-center mt-8'>
                                <button
                                    type='submit'
                                    className='button-main'
                                    >Join</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  
}

