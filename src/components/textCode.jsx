import React from 'react'
import Typewriter from 'typewriter-effect';

const TextCode = ({ text,textAnim }) => {
    return (
        <pre className='whitespace-pre-wrap overflow-auto text-[14px]' >
            {textAnim ?
            <Typewriter
            options={{
                strings:text,
                autoStart:true,
                delay:30
            }}
            /> :
            text
             }

        </pre>
    )
}

export default TextCode