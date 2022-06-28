import React , { useEffect , useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addOrder , reset, resetItems } from '../../feature/Cart.Slice';

import { Spinner , Col } from 'react-bootstrap';
import { toast } from 'react-toastify';


const Order = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {orderId , shippingAddress , items , totalPrice , taxPrice , shippingPrice , paymentMethod , isSuccess , isLoading , isError} = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(addOrder(
            {
                userToken:user.token,
                order:
                {
                orderItems:items,
                shippingAddress,
                paymentMethod,
                shippingPrice,
                taxPrice,
                totalPrice
            }
        }));
    }

    useEffect(() => {
        if(isSuccess){
            toast.success('Your order has been added successfuly', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate(`/order/${orderId}`);
              dispatch(reset());
              dispatch(resetItems());
        }
    },[isSuccess]);

    useEffect(() => {
        if(isError){
            toast.error('An error occured please try again', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        dispatch(reset());
    },[isError]);
    

  return (
    <div class="card card0 border-0">
        {isLoading ? <Col className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col> :
        <div className='d-flex justify-content-center'>
            <div className="col-lg-12 my-5">
            <h3>Shipping</h3>
            <p>Address : { `${shippingAddress?.address} , ${shippingAddress?.city} ${shippingAddress?.postalCode} ,  ${shippingAddress?.country}` }</p>
            <hr />
            <h3>Payment Method</h3>
            <p>Method : Paypal</p>
            <hr />
            <h3>Order Items</h3>
            {items.map(i => 
                <div key={i._id} className='p-2'>
                    <div className='my-2 d-flex align-items-center'>
                        <img style={{width:"80px",padding:'0',margin:'0'}} src={i.image} alt="product image" />
                        <p className='px-5 m-0'>{i.name}</p>
                    </div>
                    <p className='my-3'>Price :  <span style={{fontWeight:'bold'}}>{i.quantity} x $</span><span style={{fontWeight:'bold'}}>{i.price}  = $</span><span style={{fontWeight:'bold'}}>{i.price * i.quantity}</span></p>
                    <hr />
                </div>
            )}
            <hr />
            <p style={{fontWeight:"bold"}}>Shipping Price : ${shippingPrice}</p>
            <p style={{fontWeight:"bold"}}>Tax Price : ${taxPrice}</p>
            <p style={{fontWeight:"bold"}}>Total Price : ${totalPrice}</p>

            <div class="row mb-3 px-3 mt-5">
                    <button onClick={() => {props.switchOrderStep("payment")}}  type="submit" class=" my-1 btn btn-dark text-center">Back</button>
                    <button onClick = {placeOrderHandler}  type="submit" class=" my-1 btn btn-dark text-center">Place Order</button>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Order