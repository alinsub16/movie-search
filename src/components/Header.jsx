import React from 'react'
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <>
        <header className='relative w-full mt-0'>
            <div className='w-full max-w-[150px] absulute  left-1/2 absolute -translate-x-1/2 z-[9] top-12'>
               <figure>
                <img src={logo} alt="Logo" />
            </figure> 
            </div>
        </header>
    </>
  )
}

export default Header