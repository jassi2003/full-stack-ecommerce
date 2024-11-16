import React from 'react'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiClick } from "react-icons/gi";
import imageTobase64 from '../helpers/ImageTobase64';
import summaryApi from '../common/Index.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';



const Signup = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        profilePic:""
})


// const handleSubmit = async(e) => {
//     e.preventDefault();
// const dataResponse=await fetch('http://localhost:8000/api/signup',{
//     method:"post",
//     headers:{
//         "content-type":"application/json"
//     },
//     body:JSON.stringify(data)
// })
// const dataApi= await dataResponse.json()
// console.log("data",dataApi)
// }

const handleSubmit = async(e) =>{
    e.preventDefault()

      const dataResponse = await fetch(summaryApi.signUp.url,{
          method : summaryApi.signUp.method,
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")
        }

        if(dataApi.error){
          toast.error(dataApi.message)
        }
  
    else{
      toast.error("Please check password and confirm password")
    }

}

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Sending data:", data);

//     try {
//       const res = await axios.post("http://localhost:8000/api/signup", data, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       console.log("Server response:", res.data);

//       if (res.data.success) {
//         //  toast.success(res.data.message); // This will show a success toast
//         console.log("user created successfully")
//         // navigate("/login");
//       }
//     } catch (error) {
//         // Enhanced error logging
//         console.error("Error details: ", error.response ? error.response.data : error.message);
//         // toast.error(error.response?.data?.message || "Signup failed. Please try again."); // Show server error message if available
//       }
//   };






const handleOnChange=(e)=>{
    const{name,value}=e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
    }
    // console.log("data login",data)


    
    

const handleUploadPic=async(e)=>{
    const file=e.target.files[0]
    const imagePic= await imageTobase64(file)
    // console.log("imahePic",imagePic)
    setData((prev)=>{
      return {
        ...prev,
        profilePic:imagePic
      }
    })
    }


    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white rounded-md flex flex-col items-center justify-center p-2 py-5 w-full max-w-md mx-auto'>
                    <div className='flex flex-col items-center justify-center h-20 w-20 overflow-hidden'>
                        <img
                            className='h-full w-full rounded-full object-cover'
                            src={data.profilePic || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnwMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQMEBgIBB//EADEQAQACAQIDBQUIAwAAAAAAAAABAgMEEQUhQRIiMWGxEzJRYnFCUoGCkZKhwTM08f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9JAAAAAAAADrsyVw5be7jvP5QYx7tiyV97HePyy8AAAAAAAAAAAAAAAREzMREbzPSFLS8Mm0RbUTNflj+2xw/RRhrGTJG+WY/b5N4GPFgxYo2x46x+DIADDm0uHN/kxxM/GOUswCLquG3xRNsPfpHTrDRdQmcS0XKc2GNp8bRHXzBKAAAAAAAAAAb3CcEZcs5LRvWnh9WivcNx9jR4/m736g2oAAAAAAPEAQOIYPYaiYrHctzjyayxxjH2tPW/WtvVHAAAAAAAAAdJp42wY4+SPRzbodFft6XFb5IBnAAAAAAABq8S/0sv4esIK5xW3Z0do62mI/lDAAAAAAAAAVuD5t6WwzPOvOPokveDLbDkrenjH8g6UY9PmpnxRek8p6fBkAAAAABr6zU102KbeNvs1+IJ/GM3by1xVnlTnP1lPfb2m9ptad7TO8vgAAAAAAAAAPtK2vaK0rNrT0gGXTam+mv2qc4n3onwmFzTaimox9um/nEw09LwytdrajvT9yPCFGKxERERtEdIB9AAABrazV001N5iZtPhGyJnzXz3m953n0dFelb1mtqxaJ6TCZq+Gbb30/7J/oEwJiYmYmNpjxiegAAAAAAADJgxWz5Yx0jnPjPw8wfdPp76jJ2KfjPSFzSaWmmptWN7T42nxl60+CmDHFKR9Z+MsoAAAAAAAANXWaKmprv7t48LImXFfFeaZI2tH8ula+s0tdTj2nlaPdt8Ac+PWSlsd7UvG1onaXkAAAABd4dpowYe9Hftzny8kvh+H2urrG3dr3pXwAAAAAAAAAAAAT+K6aMmP2tY71I5+cI7p5iJiYnq5zU4vY574+kTy+gMYAAAKvBabY8mTbxtt+n/VNq8Nr2dHj8+baAAAAAAAAAAAAASOM49stMkfajb9FdocYpvpYt920AjAAPkgDpNNERpsUR9yPRlAAAAAAAAAAAAABq8TjfQ5fpHqAIIAP/2Q=="}
                            alt=""
                        />
                    </div>
                    <form action="">
                        <label>

                            <input type="file" className='absolute hidden' onChange={handleUploadPic}/>
                    <div className=' cursor-pointer hover:bg-gray-600 rounded-full px-1 py-1 relative'>
                        <p className='flex items-center '>
                        Upload photo
                        <GiClick />
                         </p>
                        </div>
                        </label>
                        </form>

                    <form action="" onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <div className="grid">
                            <label htmlFor="">Name:</label>
                            <div className='bg-slate-200'>
                                <input className='outline-none bg-transparent py-2 px-8'
                                    type="text"
                                    placeholder="enter name"
                                    name='name'
                                    required
                                  value={data.name}
                                  onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="grid">
                            <label htmlFor="">Email:</label>
                            <div className='bg-slate-200'>
                                <input className='outline-none bg-transparent py-2 px-8'
                                    type="email"
                                    placeholder="enter email"
                                    name='email'
                                    required
                                  value={data.email}
                                  onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="grid ">
                            <label htmlFor="">Password:</label>
                            <div className='flex relative'>
                                <input className='outline-none bg-slate-200 py-2 px-8'
                                    type={showPassword ? "password" : "text"}
                                    placeholder="enter password"
                                    name='password'
                                    required
                                  value={data.password}
                                  onChange={handleOnChange}
                                />
                                <div className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? (
                                        <FaEyeSlash className='absolute right-2 top-3' />
                                    ) :
                                        (
                                            <FaEye className='absolute right-2 top-3' />

                                        )
                                    }
                                </div>
                            </div>
                            {/* <div className='ml-auto text-s hover:underline hover:text-red-600'>
                <Link to={'/forgot-password'}>forgot password</Link>
              </div> */}
                        </div>
                        <div className='mt-4'>
                            <button className='bg-green-600 text-white px-4 py-2 rounded-full  hover:scale-110 transition-all mt-5'>SignUp</button>
                        </div>
                    </form>
                    <p className="">Already have an account?<Link to={"/login"} className='hover:text-red-600'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signup;