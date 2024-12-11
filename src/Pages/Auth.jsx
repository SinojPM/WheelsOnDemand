
import React, { useContext, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Button, FloatingLabel,Form } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { getResponseFromGoogleApi, googleLoginApi, loginApi, registerApi } from '../Services/allApi';
import { registerResponseContext } from '../contextApi/ContextShare';
import { useGoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import {isUserContext} from "../contextApi/UserAuthContext"
import { isAdminContext } from '../contextApi/AdminAuthContext';
import { toast } from 'react-toastify';



const Auth = ({ insideRegister }) => {
    const {isUserAuthorized,setIsUserAuthorized} = useContext(isUserContext)
    const {isAdminAuthorized,setIsAdminAuthorized} = useContext(isAdminContext)
    const [googleUser,setGoogleUser]=useState({})
    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    const {registerResponse,setRegisterResponse} = useContext(registerResponseContext)
    const navigate = useNavigate()


    const googleLogin =useGoogleLogin({
        onSuccess:async (res)=>{
             setGoogleUser(res)
             if (googleUser) {
                const {access_token} = res
                console.log(access_token);
                
                const reqHeader = {
                    "Authorization": `Bearer ${access_token}`,
                    "Accept": 'application/json'
                }
                try{
                    const result = await getResponseFromGoogleApi(access_token,reqHeader)
                    console.log(result);
                    
                    // setGoogleUser(result.data)
                    // console.log(googleUser);
                    // const {email,id}=result?.data
                    // console.log(googleUser);
                    
                    const reqBody = {
                        email:result?.data.email,googleId:result?.data.id
                    }  
                    loginUsingGoogle(reqBody)
                    
                    
 
                }catch(err){
                    console.log(err);
                    
                }

             }

        },
        onError:(err)=>{
            console.log("err",err);
        }

    })
    const loginUsingGoogle = async(reqBody)=>{
        try{
            const result = await googleLoginApi(reqBody)
            if(result.status ==200){
                sessionStorage.setItem("user", JSON.stringify(result.data.user))
                sessionStorage.setItem("token",result.data.token)
                setIsUserAuthorized(true)
                navigate("/vehicles")
            }else{
                alert(result.response.data)
            }
            
        }catch(err){
            console.log(err);
            
        }
    }
    const handleRegister =async (e)=>{
        e.preventDefault()
        if(userData.username && userData.email && userData.password){
            try{
                const result = await registerApi(userData)
                console.log(result);
                if(result.status == 200){
                    alert(`welcome ${result?.data?.username}...please login explore more deals`)
                    setUserData({ username: "", email: "", password: "" })
                    setRegisterResponse(userData)
                    navigate('/login')
                    console.log(registerResponse);
                
                }else{
                    if(result.response.status == 406){
                        alert(result.response.data)
                        setUserData({ username: "", email: "", password: "" })
                        navigate('/login')
                    }
                    
                }
                
            }catch(err){
                console.log(err);
                
            }
        }
    }
    const handleLogin= async (e)=>{
        e.preventDefault()
        if(userData.email && userData.password){
            try{
              const result = await loginApi(userData)
              console.log(result);
              
              if(result.status == 200){
                sessionStorage.setItem("user",JSON.stringify(result.data.user))
                sessionStorage.setItem('token',result.data.token)
                setUserData({ username: "", email: "", password: "" })
                const Data = JSON.parse(sessionStorage.getItem("user"))
                console.log(Data);
                
                if(Data.role=="admin"){
                    setIsAdminAuthorized(true)
                    console.log(isAdminAuthorized);
                    setUserData({ username: "", email: "", password: "" })
                    navigate('/admin')
                }else{
                    setIsUserAuthorized(true)
                    console.log(isUserAuthorized);
                    setUserData({ username: "", email: "", password: "" })
                    navigate('/vehicles')
                }
              }else{
                if(result.response.status==404){
                    // alert(result.response.data)
                    toast.warning(result.response.data,{
                        autoClose:1000,
                        position:"top-center"
                    });
                }
              }
            }catch(err){
                console.log(err);
            }
        }else{
            toast.warning("Please fill the form",{
                autoClose:1000,
                position:"top-center"
            });
        }

    }
    const googleSignUp = async()=>{
        window.open("https://wheelsondemandbackend.onrender.com/auth/google/callback","_self")
    }

   
    return (
        <div style={{ height: "100vh" }} className='w-100 d-flex justify-content-center align-items-center bg-warning'>
            <div style={{ height: "90vh", width: "400px" }} className='rounded border auth-glass text-center p-3'>
                <h3 className='fw-bolder mt-5'>WOD</h3>
                <hr />
                {
                    insideRegister ?
                        <Button onClick={googleSignUp} variant="outline-success" className='my-3'><GoogleIcon /><span className="ms-3">Sign Up With Google</span></Button>
                        :
                        <Button onClick={googleLogin} variant="outline-success" className='my-5'><GoogleIcon /><span className="ms-3">Sign in With Google</span></Button>
                }
                <h5>or</h5>
                <hr className='text-warning' />
                <Form>
                    {
                        insideRegister &&
                        <FloatingLabel
                            controlId="floatingInput"
                            label="UserName"
                            className="mb-3">
                            <Form.Control value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        controlId="floatingInput2"
                        label="Email address"
                        className="mb-3">
                        <Form.Control value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel  label="Password">
                        <Form.Control value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" />
                    </FloatingLabel>
                    {
                        insideRegister ?
                            <div className="mt-3">
                                <button onClick={handleRegister} className="btn btn-primary mb-3">Register</button>
                                <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                            </div>
                            :
                            <div className="mt-3">
                                <button onClick={handleLogin} className="btn btn-primary mb-3">login
                                </button>
                                <p>New User? Click here to <Link to={'/Register'}>Register</Link></p>
                            </div>

                    }
                        <Link className='btn text-dark' to={'/'}>Back to home</Link>
                </Form>
            </div>

        </div>
    )
}

export default Auth