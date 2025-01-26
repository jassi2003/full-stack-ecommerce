import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { RiUploadCloudFill } from "react-icons/ri";
import uploadImage from '../helpers/UploadImage';
import DisplayImg from './DisplayImg';
import { RiDeleteBin6Line } from "react-icons/ri";
import summaryApi from '../common/Index';
import { toast } from 'react-toastify';



const UploadProduct = ({ onClose,fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const [DisplayProductimg, setDisplayProductimg] = useState(false);
    const [imageUrl, setimageUrl] = useState("");

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        // console.log("file", file);

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
        // console.log("upload image", uploadImageCloudinary.url)



    }
    const handleImageClick = (url) => {
        setDisplayProductimg(true);
        setimageUrl(url);
    };

    const handleDeleteProductImg = async (index) => {
        const imgDelete = [...data.productImage]
        imgDelete.splice(index, 1);

        setData((preve) => {
            return {
                ...preve,
                productImage: [...imgDelete]
            }
        })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    //upload button submit
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("data",data)
        const response = await fetch(summaryApi.uploadProduct.url, {
            method: summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        const responseData=await response.json()
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()

        }
        if(responseData.error){
toast.error(responseData?.message)
        }

    }

    return (
        // <div className='mt-5 ml-60 fixed mx-auto bg-white py-4 px-4 rounded shadow-md w-[500px]   mt-20 max-h-[calc(60vh-40px)] overflow-hidden'>
        //     {/* Title Section */}
        //     <div className='flex items-center justify-between mb-4'>
        <div className='fixed w-full  h-full  bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center mt-5'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>

                    <h1 className='font-bold text-lg'>Upload Product</h1>
                    <button className='p-2 bg-red-300 rounded-full hover:bg-red-400' onClick={onClose}>
                        <IoClose className='text-lg' />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-2 grid gap-y-4 overflow-y-auto max-h-[70vh]'>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        required
                        type="text"
                        id='productName'
                        name='productName'
                        placeholder='Enter Product Name'
                        onChange={handleOnChange}
                        value={data.productName}
                        className='border rounded-md focus:outline-none focus:ring-2 focus:ring-black-900'
                    />

                    <label htmlFor="brandName">Brand Name:</label>
                    <input
                        required
                        type="text"
                        id='brandName'
                        name='brandName'
                        placeholder='Enter Brand Name'
                        onChange={handleOnChange}
                        value={data.brandName}
                        className='border rounded-md focus:outline-none focus:ring-2 focus:ring-black-900'
                    />

                    <label htmlFor="category">Category:</label>
                    <select
                        required

                        value={data.category}
                        name='category'
                        // onChange={(e) => setData({ ...data, category: e.target.value })}
                        onChange={handleOnChange}
                        className='border rounded-md focus:outline-none focus:ring-2 focus:ring-black-900'>
                        <option value={""}>Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>
                                {el.label}
                            </option>
                        ))}
                    </select>


                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><RiUploadCloudFill />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>


                    <div className='flex gap-3'>
                        {
                            data.productImage[0] ? (
                                data.productImage.map((el, index) => {
                                    return (

                                        <div className='relative group' key={index}>
                                            <div className='p-2 rounded h-[100px] w-[100px] flex   '>
                                                <img src={el} className='rounded ' alt={el} onClick={() => handleImageClick(el)} />
                                                <div className='w-5 h-5 p-4 absolute text-xl bottom-0 right-[6px] top-[60px]   flex items-center justify-center rounded-full  hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImg(index)}><RiDeleteBin6Line />


                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='text-red-600 text-l'>please upload image...</div>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor=""> Price:</label>
                        <input
                            required

                            type="number"
                            name='price'
                            id='price'
                            placeholder='Enter selling Price'
                            value={data.price}
                            onChange={handleOnChange}
                            className='border rounded-md focus:outline-none focus:ring-2 focus:ring-black-900 w-full'
                        />
                    </div>

                    <div>
                        <label htmlFor=""> selling Price:</label>
                        <input
                            required

                            type="number"
                            name='sellingPrice'
                            id='sellingPrice'
                            placeholder='Enter selling Price'
                            value={data.sellingPrice}
                            onChange={handleOnChange}
                            className='border rounded-md focus:outline-none focus:ring-2 focus:ring-black-900 w-full'
                        />
                    </div>

                    <label htmlFor="description">Description:</label>
                    <textarea
                        required

                        className="bg-slate-100 h-28 border-none resize-none p-1 outline-none"
                        placeholder='enter product description'
                        id=""
                        onChange={handleOnChange}
                        value={data.description}
                        name='description'

                    >
                    </textarea>

                    <div className='flex items-center justify-center bg-green-600 rounded p-1 text-white hover:bg-green-500'>
                        <button>Upload Product</button>

                    </div>

                </form>
            </div>
            {
                DisplayProductimg && (
                    <DisplayImg className="" onClose={() => setDisplayProductimg(false)} imgUrl={imageUrl} />
                )
            }
        </div>

    );
};

export default UploadProduct;
