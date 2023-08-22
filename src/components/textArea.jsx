import React from 'react'

const TextArea = ({searchRef,placeholder,doApi}) => {
  return (
    <textarea onKeyDown={(e)=>{
        if(e.key === 'Enter'){
          // console.log(e.target.value)
          // console.log(gptRef.current.value)
          doApi()
        }
      }} ref={searchRef} type="text" placeholder={placeholder} className="textarea textarea-bordered textarea-lg w-full pr-[10%]"
      />

  )
}

export default TextArea