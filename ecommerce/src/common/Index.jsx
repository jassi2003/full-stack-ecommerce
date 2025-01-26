const backendDomain="https://full-stack-ecommerce-0vrv.onrender.com"

const summaryApi={
    signup:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },

    login:{
url:`${backendDomain}/api/login`,
        method:"post"
    },
    current_user:{
url:`${backendDomain}/api/user-details`,
        method:"get"
    },
    logout_user:{
url:`${backendDomain}/api/logout`,
        method:"get"
    },
    allUser:{
        url:`${backendDomain}/api/allUsers`,
        method:"get"
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:"post"
    },
uploadProduct:{
    url:`${backendDomain}/api/upload-product`,
    method:"post"
},

getProducts:{
    url:`${backendDomain}/api/get-products`,
    method:"get"
},
updateProduct:{
    url:`${backendDomain}/api/update-product`,
    method:"post"
},

getProductCategory:{
    url:`${backendDomain}/api/product-category`,
    method:'get'
},
getCategoryWise:{
     url:`${backendDomain}/api/categoryWiseProduct`,
    method:'post'
},

getProductDetails:{
url:`${backendDomain}/api/productDetails`,
method:'post'
},

addtocart:{
url:`${backendDomain}/api/addToCart`,
method:'post'
}, 

countCartProducts:{
url:`${backendDomain}/api/cartCountProducts`,
method:'get'
}, 
viewCartProducts:{
url:`${backendDomain}/api/view-products`,
method:'get'
}, 
updateCartProduct:{
url:`${backendDomain}/api/update-cart-product`,
method:'post'
}, 
deleteCartProduct:{
url:`${backendDomain}/api/delete-cart-product`,
method:'post'
}, 
searchProduct:{
url:`${backendDomain}/api/search-product`,
method:'get'
}, 
filterProduct:{
url:`${backendDomain}/api/filter-product`,
method:'post'
}, 


}

export default summaryApi