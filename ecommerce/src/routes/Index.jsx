import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Signup from "../pages/Signup.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllUsers from "../pages/AllUsers.jsx";
import AllProducts from "../pages/AllProducts.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Search from "../pages/Search.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'Signup',
                element: <Signup />
            },
            {
                path: 'category-page',
                element: <CategoryPage />

            },
            {
                path:'product/:id',
                element:<ProductDetails/>
        },
            {
                path:'cart',
                element:<Cart/>
        },
            {
                path:'search',
                element:<Search/>
        },




            {
                path: 'adminPanel',
                element: <AdminPanel />,
                children: [{
                    path: 'all-users',
                    element: <AllUsers />
                },
                {
                    path: 'all-products',
                    element: <AllProducts />
                },
                ]
            },


        ]
    }
])

export default router;