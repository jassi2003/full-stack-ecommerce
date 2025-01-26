import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common/Index'
import { useEffect } from 'react'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setcartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: 'include'
    })

    // console.log("datares",dataResponse);
    const dataApi = await dataResponse.json()
    // console.log("dataapi",dataApi);
    if (dataResponse.status == 200) {
      dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchCountProductsInCart = async () => {
    const dataResponse = await fetch(summaryApi.countCartProducts.url, {
      method: summaryApi.countCartProducts.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    // console.log("count", dataApi) 
    setcartProductCount(dataApi?.data?.count)

  }

useEffect(() => {
    fetchUserDetails()
    fetchCountProductsInCart()
  }, [])

  
  return (
    <>
      <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchCountProductsInCart }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-20'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
