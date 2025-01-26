import React from 'react'
import summaryApi from '../common/Index'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [loading, setloading] = useState(false);
  const categoryLoading = new Array(13).fill(null)

  const fetchProductByCategory = async () => {
    setloading(true)
    const response = await fetch(summaryApi.getProductCategory.url)
    const dataResponse = await response.json();
    setloading(false)
    setcategoryProduct(dataResponse.data)
  }
  useEffect(() => {
    fetchProductByCategory()
  }, [])


  return (
    <div className='flex justify-between p-5 gap-5 overflow-scroll scrollbar-none'>
      {
        loading ? (
          categoryLoading.map((el, index) => {
            return (

              <div>
                <div className='md:w-20 md:h-20 w-16 h-16 border rounded-full overflow-hidden flex items-center justify-center gap-2 cursor-pointer'>
                  <div>
                    <img src="" alt="" className='mx-auto  w-full h-full object-cover mix-blend-multiply overflow-hidden' />
                  </div>
                </div>
                <p className='text-center text-sm md:text-base capitalize'></p>
              </div>
            )
          })
        ) : (

          categoryProduct.map((el, index) => {
            return (

              <div>
                <Link to={"/category-page?category=" + el?.category} className='md:w-20 md:h-20 w-16 h-16 border rounded-full overflow-hidden flex items-center justify-center gap-2 cursor-pointer'>
                  <div>
                    <img src={el?.productImage[0]} alt="" className='mx-auto  w-full h-full object-cover mix-blend-multiply overflow-hidden' />
                  </div>
                </Link>
                <p className='text-center text-sm md:text-base capitalize'>{el?.category}</p>
              </div>
            )
          })
        )
      }


    </div>
  )
}

export default CategoryList;