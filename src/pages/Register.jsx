import { Alert , Spinner } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { register, registerReset } from '../feature/userSlice';

import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup  from "yup"; 

import ('./auth.css');



const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user , registerLoading , registerSuccess , registerError } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(user){
            navigate('/');
        }
    },[]);

    const formik = useFormik({
        initialValues: {
            name:"",
            email :"",
            password : "",
            passwordConfirm:"",
        },
        validateOnChange:false,
        validationSchema:Yup.object({
            name:Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').required('Email is required'),
            password:Yup.string().required('Password is required'),
            passwordConfirm:Yup.string().required('Password is required').oneOf([Yup.ref('password')], 'Your passwords do not match.')
            
        }),
        onSubmit:async ({password,passwordConfirm,email,name}) => {    
            dispatch(register({password,passwordConfirm,name,email}));
        }
      });

      useEffect(() => {
        if(registerSuccess){
            toast.success('Account created successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            dispatch(registerReset());
            navigate('/signin');
        }
      },[registerSuccess])

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
                            
                            { registerError && 
                                <Alert variant={"danger"}>
                                        {registerError}
                                </Alert>
                            }
                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:"translateX(-10px)"}} className='text-danger my-2'> {formik.errors.name ? "* " + formik.errors.name : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Name</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.name} class="mb-4" type="text" name="name" placeholder="Enter a valid Name"/>
                            </div>
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
                            <div class="row px-3 my-3">
                                <span style={{fontSize:"13px",transform:"translateX(-10px)"}} className='text-danger my-2'> {formik.errors.passwordConfirm ? "* " + formik.errors.passwordConfirm : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Password Confirm</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.passwordConfirm} type="password" name="passwordConfirm" placeholder="Enter password Confirm"/>
                            </div>

                            <div class="row mb-3 px-3">
                            { registerLoading ? <div className='text-center' > <Spinner animation="border" /> </div> : <button type="submit" class="btn btn-blue text-center">Register</button>}
                            </div>
                            <div class="row mb-4 px-3">
                                <small class="font-weight-bold">Already have an account? <Link to={"/signin"} class="text-danger ">Login</Link></small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Register