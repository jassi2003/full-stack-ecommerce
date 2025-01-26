import React, { useState, useEffect } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common/Index';
import AdminProductCard from '../components/AdminProductCard';



const AllProducts = () => {
  const [UploadProductComp, setUploadProductComp] = useState(false);
  const [allProducts, setallProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(summaryApi.getProducts.url);
    const dataResponse = await response.json();
    console.log('data resp', dataResponse);
    setallProducts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between ml-5 mt-10">
        <div className='text-3xl font-semibold ml-3 '>All Products:</div>
        <div className="border-2 border-green-500 rounded-full p-1 text-green-600 hover:bg-green-100">
          <button onClick={() => setUploadProductComp(true)}>Upload Product</button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex gap-5 p-8 flex-wrap">
        {allProducts.map((el, index) => {
          return (
            <AdminProductCard data={el} key={index + "allProducts"}  fetchData={fetchAllProducts}/>
          )

        })}
      </div>

      {/* Upload Product Component */}
      {UploadProductComp && (
        <UploadProduct onClose={() => setUploadProductComp(false)} fetchData={fetchAllProducts}  />
      )}

      
    </div>
  );
};

export default AllProducts;
