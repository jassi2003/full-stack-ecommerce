import React from 'react'
import { MdEdit } from "react-icons/md";
import EditProduct from './EditProduct';
import { useState } from 'react';
import displayCurrency from '../helpers/DisplayCurrency';



const AdminProductCard = ({data,fetchData}) => {
const[openEditProduct,setopenEditProduct]=useState(false);


  return (
    <div>

    <div className='flex flex-col items-center  bg-white rounded-md p-3  w-[300px]'>
    <div
    //   key={index}
      className=" w-40 h-40 border rounded overflow-hidden"
    >
      <img
        src={data?.productImage[0]}
        alt=""
        className=" mx-auto  w-full h-full object-cover"
      />
</div>
<div>
<div className='flex items-center justify-between gap-2'>
<h1 className=' capitalize text-lg font-semibold line-clamp-1'>{data.productName}</h1>
<div className='cursor-pointer bg-red-300 p-1 rounded-full mt-1 ml-2 hover:bg-red-400'> 
<MdEdit className='' onClick={()=>{setopenEditProduct(true)}} />
</div>
</div>
</div>
<div className='mr-20'>
<p>{
displayCurrency(data.price)
}</p>
</div>
</div>


{
    openEditProduct &&(
        <EditProduct productData={data} onClose={()=>setopenEditProduct(false)} callFunc={fetchData}/>
)}
</div>

  )
}

export default AdminProductCard
