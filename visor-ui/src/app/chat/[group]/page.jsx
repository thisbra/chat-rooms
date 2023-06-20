'use client'

import { useState } from 'react'
import Image from 'next/image'
import { v4 } from 'uuid'
import io from 'socket.io-client'
import { useSearchParams, usePathname } from 'next/navigation'


const socket = io('http://localhost:3005')

export default function Page() {

    const searchParams = useSearchParams()
    const usernameFromParams = searchParams.get('username')
    const [username, setUsername] = useState(usernameFromParams)

    const roomFromParams = usePathname().split('/')[2]
    const [room, setRoom] = useState(roomFromParams)


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
                <div className='card-container mt-16 flex flex-col items-center'>
                    
                </div>
            </div>
        </div>
    )
  
}

