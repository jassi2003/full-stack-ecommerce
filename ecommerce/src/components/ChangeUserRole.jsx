import React from 'react'
import ROLE from '../common/Role'
import { IoClose } from "react-icons/io5";
import { useState  } from 'react';
import summaryApi from '../common/Index';
import { toast } from 'react-toastify';



const ChangeUserRole = ({name,email,role,userId,onClose,callFunc}) => {
const[userRole,setUserRole]=useState(role); 


const handleChangeSelect=(e)=>{
setUserRole(e.target.value)
console.log(e.target.value)
}

const updateRole=async()=>{
const fetchData=await fetch(summaryApi.updateUser.url,{
method:summaryApi.updateUser.method,
credentials:'include',
headers:{
    "content-type":"application/json"
},
body:JSON.stringify({
    userId:userId,
    role:userRole
})
});
const dataResponse= await fetchData.json();
if(dataResponse.success){
    toast.success(dataResponse.message)
    onClose()
    callFunc()
}
console.log("role updated",dataResponse);
}


  return (
    <div className=' mr-20 mt-40 w-full h-full flex items-center justify-between  '>
        <div className='mx-auto bg-white py-4 px-4 rounded shadow-md w-full max-w-sm '>
    <div><button className='ml-auto block' onClick={onClose}>
            <IoClose/>
    </button></div>
        <h1 className='font-bold'>Change User Role</h1>
    <p>Name:{name}</p>
    <p>Email:{email}</p>

    <div className='flex items-center    justify-between'>
<p>Role</p>
<select className='border ' id="" value={userRole} onChange={handleChangeSelect}>
{
    Object.values(ROLE).map(el=>{
        return(
            <option value={el} key={el}>{el}</option>
        )
    })
}
</select>
</div>
<div className=' w-max mx-auto rounded-md p-1 flex items-center justify-center  bg-red-100 hover:bg-red-200'>
<button onClick={updateRole}>Change Role</button>
</div>
    </div>
    </div>
  )
}

export default ChangeUserRole