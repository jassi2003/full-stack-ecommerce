import React from 'react';
import { useState } from 'react';
import Logo from './Logo';
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common/Index';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';
import Context from '../context';
import { useContext } from 'react';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context)
    const navigate=useNavigate();

    const handleLogout = async () => {
        try {
            const dataResponse = await fetch(summaryApi.logout_user.url, {
                method: summaryApi.logout_user.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                dispatch(setUserDetails(null));
                navigate("/")
            } else if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("An error occurred while logging out");
        }
    };

const handleSearch=(e)=>{
const{value}=e.target
if(value){
    navigate(`/search?q=${value}`)
}
else{
    navigate("/search")
}
}


    // console.log("count cart,", context)

    return (
        <>
            <header className='h-21 shadow-md flex items-center justify-between fixed z-40 w-full p-1'>
                <div>
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>
                <div className="hidden lg:flex items-center h-5">
                    <IoSearchOutline />
                    <input
                        className='outline-none border-2 rounded-md'
                        type="text"
                        placeholder='Search products...'
                        onChange={handleSearch}
                    />
                </div>

                <div className='flex gap-3'>

                    {user?._id && (
                        <div className='flex gap-2 text-3xl relative'>
                            <div className="relative group">
                                {user?.profilePic ? (
                                    <div className='flex items-center justify-center h-10 w-10 rounded-full overflow-hidden shadow-lg bg-gray-100'>
                                        <img src={user?.profilePic} className='h-full w-full object-cover' alt="Profile" />
                                    </div>
                                ) : (
                                    <FaRegUserCircle />
                                )}
                                <span className=" cursor-pointer absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white md:bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <nav >
                                        {user?.role === ROLE.ADMIN && (
                                            <div>
                                                <Link to={"/adminPanel"} className='whitespace-nowrap md:hover:bg-blue-700  rounded-md px-1 hidden md:block'>1.Admin Panel</Link>
                                            </div>
                                        )}
                                        {/* <Link to={"/userPanel"}  className='whitespace-nowrap hover:bg-blue-700 rounded-md px-1'>2.User Panel</Link>   */}
                                    </nav>
                                </span>
                            </div>
                            <div className="relative group">
                                <span className=" cursor-pointer absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <nav >
                                        {user?.role === ROLE.ADMIN && (
                                            <div>
                                                {/* <Link to={"/adminPanel"} className='whitespace-nowrap hover:bg-blue-700 rounded-md px-1 hidden md:block'>Admin Panel</Link> */}
                                            </div>
                                        )}
                                        {/* <Link to={"/userPanel"} className='whitespace-nowrap hover:bg-blue-700 rounded-md px-1'>User Panel</Link> */}
                                    </nav>
                                </span>
                            </div>
                            <Link to="/cart" className="flex relative hover:text-red-500">
                               <button type="button"><FaShoppingCart /></button> 
                                <div className='bg-red-600 rounded-full h-5 w-5 flex items-center justify-center text-white absolute -top-3 -right-4'>
                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div className='bg-red-600 rounded-full text-white px-2 py-1 overflow-hidden hover:bg-red-800 '>
                        {user?._id ? (
                            <button onClick={handleLogout} className='' >Logout</button>
                        ) : (
                            <Link to={"/login"}>Login</Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
