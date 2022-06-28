import { Alert , Spinner } from 'react-bootstrap';

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login , reset } from '../feature/userSlice';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup  from "yup"; 

import ('./auth.css');

const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user , isLoading , isError , isSuccess } = useSelector((state) => state.user);

    // useEffect(() => {
    //     if(user){
    //         navigate('/');
    //     }
    // },[]);

    const formik = useFormik({
        initialValues: {
            email :"",
            password : "",
        },
        validateOnChange:false,
        validationSchema:Yup.object({
            email: Yup.string().email('Must be a valid email').required('Email is required'),
            password:Yup.string().required('Password is required')
        }),
        onSubmit:async ({password,email}) => {
            dispatch(login({password,email}))
        }
      });

      useEffect(() => {
        if(isSuccess || user){
            if(new URLSearchParams(location.search).get('redirect')){
                navigate('/payment');
            }else{
                navigate('/');
            }
        }
        dispatch(reset());
      },[isSuccess])
    
    return (
        <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            
        <div class="card card0 border-0">
            <div class="row d-flex">
                <div class="col-lg-6">
                    <div class="card1 pb-5">
                        <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src={process.env.PUBLIC_URL + '/images/auth.jpg'} class="image"/>
                        </div>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} class="col-lg-6">
                    <div class="col-lg-12">
                        <div class="card2 card border-0 px-4 py-5">
                            
                            { isError && 
                                <Alert variant={"danger"}>
                                    {isError}
                                </Alert>
                            }
                            <div class="row px-3">
                            <span style={{fontSize:"13px",transform:"translateX(-10px)"}} className='text-danger my-2'> {formik.errors.email ? "* " + formik.errors.email : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Email Address</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.email} class="mb-4" type="text" name="email" placeholder="Enter a valid email address"/>
                            </div>
                            <div class="row px-3">
                            <span style={{fontSize:"13px",transform:"translateX(-10px)"}} className='text-danger my-2'> {formik.errors.password ? "* " + formik.errors.password : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Password</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password" placeholder="Enter password"/>
                            </div>
                            <div class="row px-3 mb-4">

                                <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                            </div>
                            <div class="row mb-3 px-3 ">
                                { isLoading ? <div className='text-center' > <Spinner animation="border" /> </div> : <button type="submit" class="btn btn-blue text-center">Login</button>}
                                
                            </div>
                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Don't have an account? <Link to={"/register"} class="text-danger ">Register</Link></small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Auth