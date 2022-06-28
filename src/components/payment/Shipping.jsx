import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShippingAddress } from '../../feature/Cart.Slice';

import { useFormik } from "formik";
import * as Yup  from "yup"; 

const Shipping = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.cart);

    const formik = useFormik({
        initialValues: {
            address :shippingAddress?.address ,
            city : shippingAddress?.postalCode,
            postal : shippingAddress?.postalCode,
            country : shippingAddress?.country
        },
        validationSchema:Yup.object({
            address:Yup.string().required('Address is required'), 
            city:Yup.string().required('City is required'),
            postal:Yup.string().required('postal code is required'),
            country:Yup.string().required('Country is required')
        }),
        onSubmit:async ({address,city,postal,country}) => {
            dispatch(setShippingAddress({address,city,postalCode:postal,country}));
            props.switchOrderStep("payment");
        }
    });


  return (
            
        <div class="card card0 border-0">
                <form onSubmit={formik.handleSubmit} class="col-lg-12">
                    <div className='d-flex justify-content-center'>
                    <div className="col-lg-12">
            
                        <div class="card2 card border-0 px-4 py-5">

                            <span style={{fontSize:"13px"}} className='text-danger mt-2 mb-1'> {formik.errors.address ? "* " + formik.errors.address : ''}</span>
                            <div class="row px-3">
                                <label class='mb-1'><h6 class="mb-0 text-sm">Address</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.address}  class={`mb-4 form-control ${formik.errors.address ? "is-invalid" : ""}`} type="text" name="address" placeholder="Address"/>
                            </div>

                            <span style={{fontSize:"13px"}} className='text-danger mt-2 mb-1'> {formik.errors.city ? "* " + formik.errors.city : ''}</span>
                            <div class="row px-3">
                                <label class="mb-1"><h6 class="mb-0 text-sm is-invalid">City</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.city}  class={`mb-4 form-control ${formik.errors.city ? "is-invalid" : ""}`} type="text" name="city" placeholder="City"/>
                            </div>

                            <span style={{fontSize:"13px"}} className='text-danger mt-2 mb-1'> {formik.errors.postal ? "* " + formik.errors.postal : ''}</span>
                            <div class="row px-3">
                                <label class="mb-1"><h6 class="mb-0 text-sm">Postal Code</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.postal} class={`mb-4 form-control ${formik.errors.postal ? "is-invalid" : ""}`} type="text" name="postal" placeholder="Postal Code"/>
                            </div>

                            <span style={{fontSize:"13px"}} className='text-danger mt-2 mb-1'> {formik.errors.country ? "* " + formik.errors.country : ''}</span>
                            <div class="row px-3">
                                <label class="mb-1"><h6 class="mb-0 text-sm">Country</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.country} class={`mb-4 form-control ${formik.errors.country ? "is-invalid" : ""}`} type="text" name="country" placeholder="Country"/>
                            </div>

                            <div class="row mb-3 px-3">
                                <button  type="submit" class="btn btn-dark text-center">Continue</button>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </form>
        </div>)
}

export default Shipping;