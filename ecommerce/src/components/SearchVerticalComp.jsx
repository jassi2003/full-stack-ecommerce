import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import fetchCategoryWise from '../helpers/FetchCategoryWiseProducr'
import displayCurrency from '../helpers/DisplayCurrency';
import { Link } from 'react-router-dom';
import Context from '../context';
import { useContext } from 'react';
import addToCart from '../helpers/AddToCart';


const SearchVerticalComp = ({ loading, data = [] }) => {
    // const [data, setData] = useState([])
    // const [loading, setloading] = useState(true)
    // const [scrollProducts, setscrollProducts] = useState(0)
    const { fetchCountProductsInCart } = useContext(Context);
    const loadingList = new Array(13).fill(null)



    const handleCart = async (e, id) => {
        await addToCart(e, id)
        fetchCountProductsInCart()
    }


    return (
        // {/* <div className='container mx-auto my-2 px-3  gap-2 items-center overflow-scroll md:overflow-hidden scrollbar-none relative tranisition-all'> */}
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

            {
                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ): (

                    data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product._id} className='' onClick={() => window.scrollTo({ top: 0, behaviour: 'smooth' })}>

                                <div className='overflow-hidden bg-slate-200 h-full w-[280px]  md:min-w-[145px] h-[110px] md:h-[180px]  mt-[120px] md:mt-1 rounded-t-md p-2'>
                                    <img src={product.productImage[0]} className='w-[160px] h-full rounded-md overflow-hidden hover:scale-110 transition-all mix-blend-multiply ' alt="" />
                                </div>
                                <div className='p-2 bg-white rounded-b-md capitalize w-full border min-w-[220px] md:min-w-[200px] max-w-[280px]  flex shadow flex-col items-center'>
                                    {/* <div className='p-2  font-semibold flex '> */}
                                    <h2 className='md:text-2xl text-sm line-clamp-1 text-ellipsis' >{product?.productName}</h2>
                                    <p className='text-slate-300 md:text-l'>{product?.category}</p>
                                    <div className='flex gap-3'>

                                        <p className='text-red-500'>{displayCurrency(product?.sellingPrice)}</p>
                                        <p className='line-through text-slate-400'>{displayCurrency(product?.price)}</p>
                                    </div>
                                    <div className='bg-red-500 rounded-full p-1 w-full  mt-2'>
                                        <button className='w-full' onClick={(e) => handleCart(e, product?._id)}>Add to Cart</button>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>

        //    </div>  
    )
}

export default SearchVerticalComp