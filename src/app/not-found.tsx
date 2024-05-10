import Link from 'next/link'
import meme from '../assets/GoodThinkingMeme.gif'

export default function NotFound() {
    return (
        <div className='h-screen flex flex-col bg-black text-white justify-center items-center'>
            <h2 className='text-center text-3xl sm:text-5xl md:text-6xl mx-4'>401 | Unauthorized Access</h2>
            <img className='rounded-lg my-16 px-4' src={meme.src} alt="Good Thinking Meme" />
            <p className='text-center text-xl mb-8 mx-4'>You can&apos;t outsmart the Potty Map team. Try logging in next time.</p>
            <Link className='underline' href="/">Click here to Return Home</Link>
        </div>
    )
}