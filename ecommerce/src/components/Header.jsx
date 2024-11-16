import React from 'react'
import Logo from './Logo'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <>
    
    <header className='h-21 shadow-md flex items-center justify-between '>
        <div className=''>
            <Link to={"/"}>
            <Logo/>
            </Link>
        </div>
    <div className="hidden lg:flex items-center h-5  ">
    <IoSearchOutline className='' />
<input className='outline-none border-2 rounded-md' type="text"placeholder='search products...' />
    </div>

<div className='flex gap-4'>
   <div className='flex gap-2 text-3xl'>
   <FaRegUserCircle className=''/>
   <div className="flex relative">
   <FaShoppingCart className=''/>
   <div className='bg-red-600 rounded-full h-5 w-5 flex items-center p-1 absolute -top-3 -right-4'>
   <p className='text-lg'>0</p>
   </div>
   </div>
</div>
<div className='bg-red-600 rounded-full text-white px-2 py-1'>
    <Link to={"/login"}>login</Link>
</div>
</div>

    
    </header>
    </>
  )
}

export default Header