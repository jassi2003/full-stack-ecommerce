import React from 'react'
import { useState, useEffect, useRef } from 'react'
import fetchCategoryWise from '../helpers/FetchCategoryWiseProducr'
import displayCurrency from '../helpers/DisplayCurrency';
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/AddToCart';
import Context from '../context';
import { useContext } from 'react';


const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const { fetchCountProductsInCart } = useContext(Context);


    const [scrollProducts, setscrollProducts] = useState(0)
    const scrollElement = useRef()

    const fetchData = async () => {
        setloading(true)
        const fetchCategoryProduct = await fetchCategoryWise(category)
        setloading(false)
        // console.log(fetchCategoryProduct.data)
        setData(fetchCategoryProduct?.data)
    }


    const handleCart = async (e, id) => {
        // await addToCart(e,id)
        await addToCart(e, id)
        fetchCountProductsInCart()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    return (
        <div className='p-7 relative' >

            <h2 className='text-2xl font-semibold'>{heading}</h2>
            <div className='flex items-center justify-center'>
                <button className='absolute bg-slate-400 rounded-full p-2 left-0 ml-[3px] mt-[170px] text-lg hidden md:block' onClick={scrollLeft}><VscTriangleLeft /></button>
                <button className='absolute bg-slate-400 rounded-full p-2 right-0 mt-30 mt-[170px] text-lg hidden md:block' onClick={scrollRight}><VscTriangleRight /></button>
            </div>
            <div className='container mx-auto my-2 px-3  gap-2 items-center overflow-scroll md:overflow-hidden scrollbar-none relative tranisition-all' ref={scrollElement}>
                <div className='flex gap-2'>

                    {
                        loading ? (
                            loadingList.map((product, index) => {
                                return (

                                    <div className='bg-white w-full border min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 flex shadow  rounded-md'>
                                        <div className='overflow-hidden bg-slate-200 h-full min-w-[120px] md:min-w-[145px]  rounded-md p-2'>
                                            <img src="" className='w-[150px] h-full rounded-md overflow-hidden hover:scale-110 transition-all mix-blend-multiply ' alt="" />
                                        </div>
                                        <div className='p-4 capitalize font-semibold'>
                                            <h2 className='md:text-lg text-sm line-clamp-1 text-ellipsis bg-slate-200 p-1 ' ></h2>
                                            <p className='bg-slate-200 p-3 mt-2 '></p>
                                            <div className='flex gap-1'>

                                                <p className='bg-slate-200 p-2 w-[50px] mt-2 w-full'></p>
                                                <p className='bg-slate-200 w-[50px] mt-2'></p>
                                            </div>
                                            <div className='bg-slate-200 rounded-full p-1 w-[100px] mt-2'>
                                                <button></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })


                        ) : (

                            data.map((product, index) => {
                                return (

                                    <Link to={"product/" + product._id} className='bg-white w-full border min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 flex shadow  rounded-md'>
                                        <div className='overflow-hidden bg-slate-200 h-full min-w-[120px] md:min-w-[145px]  rounded- p-2'>
                                            <img src={product.productImage[0]} className='w-[150px] h-full  overflow-hidden hover:scale-110 transition-all mix-blend-multiply ' alt="" />
                                        </div>
                                        <div className='p-2 capitalize font-semibold'>
                                            <h2 className='md:text-lg text-sm line-clamp-1 text-ellipsis' >{product?.productName}</h2>
                                            <p className='text-slate-300 '>{product?.category}</p>
                                            <div className='flex gap-3'>

                                                <p className='text-red-500'>{displayCurrency(product?.sellingPrice)}</p>
                                                <p className='line-through text-slate-400'>{displayCurrency(product?.price)}</p>
                                            </div>
                                            <div className='bg-red-500 rounded-full p-1 w-[100px] mt-2'>
                                                <button onClick={(e) => handleCart(e, product?._id)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default HorizontalCardProduct