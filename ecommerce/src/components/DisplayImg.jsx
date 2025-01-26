import React from 'react';
import { IoClose } from "react-icons/io5";

const DisplayImg = ({ onClose, imgUrl }) => {
  return (
    <div className='fixed left-0 top-0 w-full h-full flex justify-center items-center bg-slate-200 bg-opacity-75'>
      <div className='ml-[58vh] mt-20 flex justify-center p-4 max-w-[90vh] max-h-[80vh] overflow-hidden'>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className='absolute top-[28vh] mr-[88vh] text-red-400 hover:text-red-500'
        >
          <IoClose className='text-4xl' />
        </button>
        
        {/* Image */}
        <img src={imgUrl} className='w-full h-full object-contain rounded-md' alt="Preview" />
      </div>
    </div>
  );
};

export default DisplayImg;
