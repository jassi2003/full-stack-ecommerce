import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import summaryApi from '../common/Index'
import { setUserDetails } from '../store/userSlice'
import SearchVerticalComp from '../components/SearchVerticalComp'
const Search = () => {
    const query=useLocation()
    // console.log("froontend query", query)

    const[data,setData]=useState([])
const[loading,setLoading]=useState(false);

    const searchProduct= async()=>{
        setLoading(true);
        const fetchData=await fetch(summaryApi.searchProduct.url+query.search)
        const dataResponse= await fetchData.json();
        setLoading(false);
        setData(dataResponse.data)
        // console.log("data response",dataResponse)
    }
    useEffect(()=>{
         searchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
{
    loading && (
    <p className='text-lg text-center'>Loading...</p>
    )
}
{
    <div>
    <p className='text-lg p-1 font-semibold'>Search Results:{data.length}</p>
    </div>
}
{
    data.length===0 && !loading && (
        <p className='text-lg text-center p-4 bg-white'>No Data Found</p>
    )
}

{
    data.length!==0 && !loading &&(
            <SearchVerticalComp loading={loading} data={data}/>
        )
    
}

    </div>
  )
}

export default Search