import React, { useState, useEffect, useContext } from 'react';
import summaryApi from '../common/Index';
import Context from '../context';
import displayCurrency from '../helpers/DisplayCurrency';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-toastify';


const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);

    const loadingCart = new Array(context.fetchCountProductsInCart || 0).fill(0);

    const fetchData = async () => {
        // setLoading(true);
        try {
            const response = await fetch(summaryApi.viewCartProducts.url, {
                method: summaryApi.viewCartProducts.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });
            const dataResponse = await response.json();

            if (dataResponse.success) {
                setData(dataResponse.data);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            // setLoading(false);
        }
    };

const incrQty=async(id,qty)=>{
const response= await fetch(summaryApi.updateCartProduct.url,{
    method:summaryApi.updateCartProduct.method,
    credentials:'include',
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        _id:id,
        quantity:qty+1
    })
})

const responseData= await response.json()

if(responseData.success){
    fetchData()
}
}
const decrQty=async(id,qty)=>{
const response= await fetch(summaryApi.updateCartProduct.url,{
    method:summaryApi.updateCartProduct.method,
    credentials:'include',
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        _id:id,
        quantity:qty-1
    })
})

const responseData= await response.json()

if(responseData.success){
    fetchData()
}
}

const handleLoading=async()=>{
    await fetchData()
}

useEffect(()=>{
    setLoading(true)
  handleLoading()  
  setLoading(false)
},[])

const deleteProduct=async(id)=>{
    const response= await fetch(summaryApi.deleteCartProduct.url,{
        method:summaryApi.deleteCartProduct.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            _id:id,
        })
    })
    
    const responseData= await response.json()
    
    if(responseData.success){
        fetchData()
        context.fetchCountProductsInCart()
        toast.success(responseData.message)
    }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log("cart data", data);


    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)

    return (
        <div className='mx-auto container mt-4'>
            <div className='flex text-xl rounded-md justify-center'>
                {data.length === 0 && !loading && (
                    <div className='bg-slate-200 p-3 rounded-md w-full flex items-center justify-center'>
                        <p>CART IS EMPTY</p>
                    </div>
                )}
            </div>

            <div className='lg:flex  p-3'>
            <div className='w-full max-w-3xl'>
                {loading ? (
                    loadingCart.map((index) => (
                        <div
                            key={index?._id}
                            className='w-full bg-slate-200 h-32 my-1 border-slate-300 animate-pulse rounded'
                        ></div>
                    ))
                ) : (
                    data.map((item, index) => (
                        <div key={item?._id} className='w-full bg-white lg:h-32 my-3 border border-slate-300 rounded ml-2'>
                            {/* Example content */}
                            <div className='flex '>
                            <div className='h-[126px] w-28 bg-slate-200 '>
                            <img src={item?.productId?.productImage[0]} className="w-full h-full mix-blend-multiply" alt="" />
                            </div>
                            <div className=''>
                            <div className='p-2'>
                               
                            <p className='capitalize text-ellipsis line-clamp-1'>{item?.productId?.productName}</p>
                            <p className='capitalize text-slate-400'>{item?.productId?.category}</p>
                            <div className='flex gap-4'>
                            <p className='text-red-500'>{displayCurrency(item?.productId?.sellingPrice)}</p>
                            <p className='text-slate-500'>{displayCurrency(item?.productId?.price)}</p>
                            </div>
                            <div className=' flex items-center gap-1 mt-2'>
                                <button className='bg-red-500 rounded-full w-6 h-6 hover:bg-red-600' type="button" onClick={()=>decrQty(item?._id,item?.quantity)}>-</button>
                                <span>{item?.quantity}</span>
                                <button className='bg-red-500 rounded-full w-6 h-6 hover:bg-red-600' onClick={()=>incrQty(item?._id,item?.quantity)}>+</button>
                            </div>
                            </div>
                            </div>

<div className=' mt-2 text-red-500 cursor-pointer text-xl hover:text-red-700' onClick={()=>deleteProduct(item?._id)}><RiDeleteBin5Fill /></div>
                            </div>

                        </div>
                    ))
                    
                )}
</div>
<div className=' flex flex-col  justify-center items-center'>
<div className=' bg-slate-200 lg:h-[140px] lg:w-[500px] rounded  ml-[100px] mt-5  '>

<div className='bg-green-500 w-full p-1   '>
<p className=''>Summary</p>
    </div>

    <div className='flex p-2'>
        <p>Quantity:</p>
        <p>{totalQty}</p>

    </div>
    <div className='flex p-2'>
        <p>Total:</p>
        <p>{displayCurrency(totalPrice)}</p>

    </div>
    <div className='bg-red-500 w-full p-1 '>
<p className=''>Payment</p>
    </div>
    </div>
</div>
</div>
         </div>
    );
};

export default Cart;
