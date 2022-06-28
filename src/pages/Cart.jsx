import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

import { MdDelete } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteItem , updateItemQuantity } from "../feature/Cart.Slice";

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [quantity,setQuantity] = useState(5);

    const { items , totalPrice , shippingPrice } = useSelector((state) => state.cart);

    const deteleItemHandler = (itemId) => {
      dispatch(deleteItem(itemId));
    } 

    const onChangeQuantityHandler = (quantity,productId) =>{
        setQuantity(quantity);
        dispatch(updateItemQuantity({quantity,productId}));
    };

    const checkoutHandler = () => {
        if(!user){
            toast.info('Please login to procceed checkout', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            navigate('/signin?redirect=shipping');
            return
        }
        navigate('/payment');
    }

  return (
    <section class="pt-5 pb-5">
        <div class="container">
            { items.length == 0  ?
            
            <div className="col-lg-12 col-md-12 col-12">
                    <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                    <p className="mb-5 text-center">
                    <i className="text-info font-weight-bold"></i>No items in your cart</p>     
                </div> : 
                <>
                <div className="row w-100">
                <div className="col-lg-12 col-md-12 col-12">
                    <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                    <p className="mb-5 text-center">
                        <i className="text-info font-weight-bold">{items.length}</i> item(s) in your cart</p>
                    <table id="shoppingCart" className="table table-condensed table-responsive">
                        <thead>
                            <tr>
                                <th style={{width:'60%'}}>Product</th>
                                <th style={{width:'12%'}}>Price</th>
                                <th style={{width:'10%'}}>Quantity</th>
                                <th style={{width:'16%'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            { items?.map((i) =>  
                            <tr key={i._id}>
                            <td data-th="Product">
                                <div class="row">
                                    <div className="col-md-3 text-left">
                                        <img src={i.image} alt="product" className="img-fluid d-none d-md-block rounded mb-2 shadow"/>
                                    </div>
                                    <div class="col-md-9 text-left mt-sm-2">
                                        <h4>{i.name}</h4>
                                        <p class="font-weight-light">{i.brand}</p>
                                    </div>
                                </div>
                            </td>
                            <td data-th="Price">${i.price}</td>
                            <td data-th="Quantity">
                                <select onChange={(e) => {onChangeQuantityHandler(e.target.value,i._id)}} style={{width:'100%'}} id='quantity' size="sm"> 
                                <option selected>{i.quantity}</option>                 
                                { [...Array(i?.countInStock).keys()].map(x => 
                                    <option key={x} value={x + 1}> {x+1}</option>
                                )}
                                
                                </select>
                            </td>
                            <td class="actions" data-th="">
                                <div class="text-center">
                                    <div class="bg-white mb-2 text-danger">
                                        <MdDelete onClick={() => {deteleItemHandler(i._id)}} style={{fontSize:'30px',cursor:'pointer'}}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                            )}      
                        </tbody>
                    </table>
                    <div class="float-right text-right">
                        <h4>Subtotal:</h4>
                        <h1>${totalPrice - shippingPrice}</h1>
                    </div>
                </div>
            </div>
            <div class="row mt-4 d-flex align-items-baseline">
                <div class="col-sm-6 order-md-2 text-right">
                    <button onClick={checkoutHandler} className="btn btn-dark">Checkout</button>
                </div>
                <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                    <Link to={'/'}><button className='btn btn-dark'>Continue shopping</button></Link>
                </div>
            </div>
                </>
            }  
        </div>
    </section>
  )
}

export default Cart;