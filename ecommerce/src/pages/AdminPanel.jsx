import React from 'react'; 
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link,Outlet,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ROLE from '../common/Role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate=useNavigate();

useEffect(()=>{
  if(user?.role !== ROLE.ADMIN){
    navigate("/")
  }
},[user,navigate])

  return (
    <div className='min-h-[calc(100vh-120px)] flex'>
      <aside className='bg-white min-h-full w-full max-w-60 flex flex-col justify-start   shadow-[4px_0_10px_rgba(0,0,0,0.5)]'>
        <div className=' flex flex-col justify-center items-center text-3xl relative  w-60 h-40'>
         
          {user?.profilePic ? (
            <div className='flex h-20 w-20 rounded-full overflow-hidden shadow-lg bg-gray-100'>
              <img src={user?.profilePic} className='h-full w-full object-cover' alt="Profile" />
            </div>
          
          ) : (
          
            <div className="flex  text-3xl">
              <FaRegUserCircle />
            </div>
            
          )}
          <div>
            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='capitalize text-sm '>{user?.role}</p>
          </div>

        </div>

          <div>
            <nav className='grid text-sm '>
<Link to={"all-users"} className='px-4 py-1 hover:bg-slate-100'>All users</Link>
<Link to={"all-products"} className='px-4 py-1 hover:bg-slate-100'>Product</Link>
            </nav>
          </div>

      </aside>
      <main className='w-full h-full p-4'>
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
