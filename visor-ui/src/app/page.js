'use client'

import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io('http://localhost:3005')

export default function Home() {

  const [socketInfo, setSocketInfo] = useState(null)

  useEffect(() => {
    setSocketInfo(socket)
  }, [socket])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Hello, {socketInfo && socketInfo.id}
      </div>
    </main>
  )
}
