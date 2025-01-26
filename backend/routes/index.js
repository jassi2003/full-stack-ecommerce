const express=require('express');
const userSignupController=require('../controllers/user/user.signup')
const userLoginController=require('../controllers/user/user.login')
const userDetailsController=require('../controllers/user/userDetails')
const userLogoutController=require('../controllers/user/user.logout')
const authToken=require('../middleware/authToken')
const allUsers =require( '../controllers/user/allUsers');
const updateUser=require("../controllers/user/updateUser");
const uploadProductController=require("../controllers/pro/uploadProduct")
const getProductController=require("../controllers/pro/getProduct")
const updateProductController=require("../controllers/pro/updateProduct")
const getCategoryProductController=require("../controllers/pro/getCategoryProduct")
const getCategoryWiseProduct=require("../controllers/pro/getCategoryWiseProduct")
const getProductDetailsController=require("../controllers/pro/getProductDetails")
const addToCartController=require("../controllers/pro/addToCart")
const cartProductCountController=require("../controllers/pro/cartProductCount")
const viewCartProductsController=require("../controllers/pro/viewProductCart")
const updateCartProductController=require("../controllers/pro/updateCartProduct")
const deleteCartProductController=require("../controllers/pro/deleteCartProduct")
const searchProductController=require("../controllers/pro/searchProduct")
const filterProductController=require("../controllers/pro/filterProduct")

const router=express.Router();

router.post("/signup",userSignupController)
router.post("/login",userLoginController)     
router.get("/user-details",authToken,userDetailsController)
router.get("/logout",userLogoutController)

//admin panel
router.get("/allUsers",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//upload product
router.post("/upload-product",authToken,uploadProductController)

// to getProduct
router.get("/get-products",getProductController)

//to update product
router.post("/update-product",authToken,updateProductController)

//to get the one category
router.get("/product-category",getCategoryProductController)

//to get the category wise product
router.post("/categoryWiseProduct",getCategoryWiseProduct)

//to get the product ddetails
router.post("/productDetails",getProductDetailsController)

//to add to cart
router.post("/addToCart",authToken,addToCartController)

//to count the no of products in the cart
router.get("/cartCountProducts",authToken,cartProductCountController)

//to view products in the cart
router.get("/view-products",authToken,viewCartProductsController)

//update cart product
router.post("/update-cart-product",authToken,updateCartProductController)

//to delete product from cart
router.post("/delete-cart-product",authToken,deleteCartProductController)

//to search produt
router.get("/search-product",searchProductController)

//to filter products based on categories
router.post("/filter-product",filterProductController)



module.exports=router;