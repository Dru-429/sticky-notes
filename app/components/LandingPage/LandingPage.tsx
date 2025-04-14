import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-screen w-screen bg-slate-950 flex justify-center items-center '>
        <div className='w-1/2 '>
            <div className='relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-zinc-200 to-slate-700  text-center font-sans font-bold'>
                Sticky Notes
            </div>
            <p className='text-lg md:text-md text-slate-400 text-center p-2'>
            Sticky Notes is a minimalist, fast, and collaborative note-taking tool for everyday thoughts.
            Built with Next.js, TypeScript, powered by Appwrite for real-time storage, and designed using Aceternity UI
            </p>
        </div>
        <BackgroundBeams />
    </div>
  )
}

export default LandingPage