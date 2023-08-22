import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
<nav className='flex justify-between px-[30px] py-[30px] bg-red-600 text-white'>
<Link to={'/'}>Home</Link>
<Link to={'/page1'}>page1</Link>
<Link to={'/page2'}>page2</Link>
</nav>
  )
}

export default Header