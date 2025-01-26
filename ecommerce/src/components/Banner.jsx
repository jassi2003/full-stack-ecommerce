import React, { useState,useEffect } from 'react';
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";

import img1 from '../assets/banner/img1.webp';
import img2 from '../assets/banner/img2.webp';
import img3 from '../assets/banner/img3.jpg';
import img4 from '../assets/banner/img4.jpg';
import img5 from '../assets/banner/img5.webp';

import img1Mobile from '../assets/banner/img1_mobile.jpg';
import img2Mobile from '../assets/banner/img2_mobile.webp';
import img3Mobile from '../assets/banner/img3_mobile.jpg';
import img4Mobile from '../assets/banner/img4_mobile.jpg';
import img5Mobile from '../assets/banner/img5_mobile.png';

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [img1, img2, img3, img4, img5];
    const mobileImages = [img1Mobile, img2Mobile, img3Mobile, img4Mobile, img5Mobile];

    const nextImage = () => {
        if (currentImage < desktopImages.length - 1) {
            setCurrentImage((prev) => prev + 1);
        }
    };

    const previousImage = () => {
        if (currentImage > 0) {
            setCurrentImage((prev) => prev - 1);
        }
    };

    useEffect(()=>{
const interval=setInterval(()=>{
    if(desktopImages.length-1>currentImage){
        nextImage();
    }else{
    setCurrentImage(0)
    }
},4000)
return ()=>clearInterval(interval)
    },[currentImage])

    return (
        <div className='mx-auto px-4 rounded'>
            <div className='h-72 w-full bg-slate-200 flex relative '>
                {/* Buttons */}
                <div className='w-full h-full absolute z-10 md:flex items-center hidden'>
                    <div className='flex justify-between w-full'>
                        {/* Previous Button */}
                        {currentImage > 0 && (
                            <button
                                onClick={previousImage}
                                className='bg-red-500 rounded p-1 ml-2 hover:bg-red-400'
                            >
                                <VscTriangleLeft />
                            </button>
                        )}

                        {/* Next Button */}
                        {currentImage < desktopImages.length - 1 && (
                            <button
                                onClick={nextImage}
                                className=' bg-red-500 rounded p-1 mr-2 hover:bg-red-400'
                            >
                                <VscTriangleRight/>
                            </button>
                        )}
                    </div>
                </div>

                {/* desktop version*/}
                <div className='hidden md:flex w-full h-full overflow-hidden'>
                    {desktopImages.map((el, index) => (
                        <div
                            className='min-h-full min-w-full transition-all'
                            key={index}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                className="mx-auto w-full h-full object-cover "
                                src={el}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
                {/* mobile version*/}
                <div className='flex w-full h-full overflow-hidden md:hidden'>
                    {mobileImages.map((el, index) => (
                        <div
                            className='min-h-full min-w-full transition-all'
                            key={index}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                className=" w-full h-full "
                                src={el}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
