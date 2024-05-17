import Link from 'next/link'
import meme from '../assets/GoodThinkingMeme.gif'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div className='h-screen flex flex-col bg-black text-white justify-center items-center'>
            <h2 className='text-center text-3xl sm:text-5xl md:text-6xl mx-4'>401 | Unauthorized Access</h2>
            <Image width={480} height={264} className='rounded-lg my-16 px-4' src={meme.src} alt="Good Thinking Meme" unoptimized />
            <p className='text-center text-xl mb-8 mx-4'>You can&apos;t outsmart the Potty Map team. Try logging in next time.</p>
            <Link className='underline' href="/">Click here to Return Home</Link>
        </div>
    )
}