import React from 'react'
import { useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import SearchVerticalComp from '../components/SearchVerticalComp';
import { FaElementor } from 'react-icons/fa';
import CategoryList from '../components/CategoryList';
import summaryApi from '../common/Index';




const CategoryPage = () => {
  const params = useParams();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectCategory, setselectCategory] = useState({})
  const [filterCategoryList, setfilterCategoryList] = useState([])
  const [SortBy,setSortBy]=useState("")
const location=useLocation()
const URLCATEGORY= new URLSearchParams(location.search)




  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

  const dataResponse = await response.json()
  setData(dataResponse?.data || [])
  setLoading(false)
  console.log("response",dataResponse)
}


const handleSelectCategory = (e) => {
  const { name, value, checked } = e.target;
  setselectCategory((prev) => {
    return {
      ...prev,
      [value]: checked
    }
  })
}
// console.log("select category", selectCategory)


useEffect(()=>{
 fetchData() 
},[filterCategoryList])


useEffect(() => {
  const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
    if (selectCategory[categoryKeyName]) {
      return categoryKeyName
    }
    return null
  }).filter(el => el)
  setfilterCategoryList(arrayOfCategory)
}, [selectCategory])

const handleOnchangeSortBy=(e)=>{
  const{value}=e.target
  setSortBy(value)

  if(value==='asc'){
    setData(prev=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
  }
  if(value==='dsc'){
    setData(prev=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
  }
}

useEffect(()=>{

},[SortBy])

return (
  <div className='container p-3'>

    {/* for desktop */}
    <div className='hidden lg:grid grid-cols-[200px,1fr]'>


      {/* left side */}
      <div className='bg-white p-2 h-full top-0 sticky'>
        <div>
          <h3 className='text-lg text-slate-400 border-b border-slate-200 '>SORT BY:</h3>
          <form action="" className='text-m mt-1' >
            <div>
              <input type="radio" name='sort' value={"asc"} checked={SortBy==='asc'} onChange={handleOnchangeSortBy}/>
              <label htmlFor="">Price-Low to High</label>
            </div>
            <div>
              <input type="radio" name='sort' value={"dsc"} checked={SortBy==='dsc'} onChange={handleOnchangeSortBy}/>
              <label htmlFor="">Price-High to High</label>
            </div>

            <div className='mt-5'>
              <p className='text-lg text-slate-400 border-b border-slate-200'>Category:</p>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className=' text-lg capitalize m-2 '>
                      <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} id={categoryName?.value} value={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName.value}>{categoryName.value}</label>
                    </div>

                  )
                })
              }</div>
          </form>
        </div>


      </div>

      {/* right side */}
      <div className='p-3 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll '>
  {
  loading ? (
    <p>Loading...</p>
  ) : data.length > 0 ? (
    <div className=''>
    <p className='px-1 font-semibold'>Search Results:{data.length} </p>
    <SearchVerticalComp data={data} loading={loading} heading="Recommended Product" />
    </div>
  ) : (
    <p>No products found for the selected category.</p>
  )}
</div>
    </div>
  </div>
)
}

export default CategoryPage