import React from 'react'
import CategoryList from '../components/CategoryList'
import Banner from '../components/Banner'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalComp from '../components/VerticalComp'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <Banner />
      <HorizontalCardProduct category={"mouse"} heading={"New Mouse"} />
      <HorizontalCardProduct category={"airpods"} heading={"Popular airpods"} />
      
      <VerticalComp category={"trimmers"} heading={"Best Selling Trimmers"} />
      <VerticalComp category={"camera"} heading={"Best Selling cameras"} />

      <HorizontalCardProduct category={"mobiles"} heading={"Popular mobiles"} />
      <HorizontalCardProduct category={"printers"} heading={"Popular printers"} />

    </div>
  )
}

export default Home