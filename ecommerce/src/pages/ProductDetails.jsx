import React from 'react'
import summaryApi from '../common/Index'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayCurrency from '../helpers/DisplayCurrency';
import VerticalComp from '../components/VerticalComp';
import HorizontalCardProduct from '../components/HorizontalCardProduct'



const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const [loading, setLoading] = useState(false);
    const productLoading = new Array(4).fill(null)
    const params = useParams();
    const [activeImage, setactiveImage] = useState("")

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.getProductDetails.url, {
            method: summaryApi.getProductDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setData(dataResponse?.data)
        setactiveImage(dataResponse?.data?.productImage[0])


    }
    console.log("data,", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleCursorChangeImg = (chngImg) => {
        setactiveImage(chngImg)
    }



    return (
        <div>
        <div className='container  h-96 p-6 flex lg:mt-10 items-center  flex-col lg:flex-row  '>

            <div className=' flex flex-col flex-col-reverse  lg:flex-row-reverse gap-5  '>
                <div className='flex flex-col capitalize'>
                    <div className='flex flex-col  '>
                        <div className='bg-red-300 rounded-full p-1 flex items-center justify-center w-[103px]'>
                            <p className='text-2xl text-red-600'>{data?.brandName}</p>
                        </div>
                        <p className='text:[10px] lg:text-[50px]'>{data?.productName}</p>
                        <p className='text-l text-slate-400'>{data?.category}</p>
                    </div>

                    <div className='flex mt-1 text-red-600'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt />
                    </div>
                    <div className='flex gap-2 text-2xl mt-3'>
                        <p className='text-red-500'>{displayCurrency(data.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{displayCurrency(data.price)}</p>
                    </div>

                    <div className='flex gap-2 text-xl mt-1 '>
                        <button className='bg-green-500 rounded-full p-1 hover:bg-green-600'>Buy Now</button>
                        <button className='bg-red-500 rounded-full p-1 hover:bg-red-600'>Add To Cart</button>
                    </div>
                    <div className='mt-4'>

                    <p>Description:</p>
                    <p className=' text-slate-500 font-semibold  line-clamp-1 lg:line-clamp-2 '>{data.description}</p>
                    </div>

                </div>

                <div className='flex flex-col items-center'>
                <div className='h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] lg:h-96 lg:w-96 bg-slate-300 rounded'>
                    <img src={activeImage} className="h-full w-full rounded mix-blend-multiply  " alt="" />
                </div>



                <div className='h-full '>
                    {
                        loading ? (
                            <div className='flex gap-2 mt-5 p-3   overflow-scroll scrollbar-none'>
                                {
                                    productLoading.map(() => {
                                        return (
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <div className='m-2 flex gap-2  '>
                                {
                                    data.productImage.map((imgUrl, index) => {
                                        return (


                                            <div className=''>
                                                <div className='h-20 w-20 bg-slate-300 rounded cursor-pointer ' key={imgUrl}>
                                                    <img src={imgUrl} alt="" className='h-full w-full rounded rounded mix-blend-multiply' onMouseEnter={() => handleCursorChangeImg(imgUrl)} />
                                                </div>
                                                <div className=''>

                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        </div>
        <div className='mt-[160px] lg:mt-0'>
    {
        

       data.category && (
        <>
        <VerticalComp category={data?.category} heading="Recommended Product"/>
        <HorizontalCardProduct category="airpods" heading="Popular Products"/>
        </>
       ) 
    }
    </div>
    </div>
    )
}

export default ProductDetails


