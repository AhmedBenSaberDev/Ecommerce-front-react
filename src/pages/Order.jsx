import React ,{ useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder , payOrder , payReset , fetchorderReset , resetDeliver , deliverOrder} from '../feature/orderSlice';
import { Spinner , Col} from 'react-bootstrap';

import axios from 'axios';

import { PayPalButton } from 'react-paypal-button-v2';

import { toast } from 'react-toastify';
import { reset } from '../feature/userInfoSlice';


const Order = () => {

    const [sdkReady,setSdkReady] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { order , isLoading , isSuccess , isError , payIsSuccess , payIsLoading , payIsError , deliverOrderError , deliverOrderSuccess , deliverOrderLoading} = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);


    useEffect(() => {
        const setPaypalScript = async () => {

            const { data : clientId }  = await axios.get('/api/config/paypal');

            const script = document.createElement('script');
            script.src = `rc="https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
                document.appendChild(script);
            }
        }

        if(!order || order._id != params.id || payIsSuccess || deliverOrderSuccess){
            dispatch(payReset());
            dispatch(resetDeliver());
            dispatch(fetchorderReset());
            dispatch(fetchOrder({userToken:user?.token,orderId:params.id}));
        } 
        if(!order?.isPaid){
            if(!window.paypal){
                setPaypalScript()
            }else{
                setSdkReady(true);
            }   
        }
    
    }, [payIsSuccess , deliverOrderSuccess]);

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
            dispatch(fetchorderReset());
            navigate('/');
        }
    },[isError])

    const paySuccessHandler = (paymentResult) => {
        dispatch(payOrder({paymentResult,userToken:user.token,orderId:order._id}));
    }

    const onPayErrorHandler = () => {
        toast.error('Payment failed', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }

    useEffect(() => {
        if(deliverOrderSuccess){
            toast.success('Order updated successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        if(deliverOrderError){
            toast.error('An error occured , please try again', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    },[deliverOrderError , deliverOrderSuccess]);

    const deliverHandler = () => {
        dispatch(deliverOrder({userToken:user.token,orderId:order._id}));
    }

  return (
    <div class="card card0 border-0">
        {isLoading ? <Col style={{minHeight:'60vh'}} className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col> :
        <div className='d-flex justify-content-center'>
            
            <div className="col-lg-8 my-5">
            <h1 className='text-center mb-5'>Order Details</h1>
            <h3>Shipping</h3>
            <p>Name : {order?.name.name}</p>
            <p>Email : {order?.name.email}</p>
            <p>Address : { `${order?.shippingAddress?.address} , ${order?.shippingAddress?.city} ${order?.shippingAddress?.postalCode} ,  ${order?.shippingAddress?.country}` }</p>
            {<p className={!order?.isDelivered ? 'alert alert-danger' :'alert alert-success' }>{!order?.isDelivered ? 'Not Delivered' : 'Delivered'}</p>}
            <hr />
            <h3>Payment Method</h3>
            <p>Method : Paypal</p>
            {<p className={!order?.isPaid ? 'alert alert-danger' :'alert alert-success' }>{!order?.isPaid ? 'Not Paid' : 'Paid'}</p>}
            <hr />
            <h3>Order Items</h3>
            {order?.orderItems.map(i => 
                <div key={i._id} className='p-2'>
                    <div className='my-2 d-flex align-items-center'>
                        <img style={{width:"80px",padding:'0',margin:'0'}} src={process.env.REACT_APP_BACKEND_ENDPOINT + i.image} alt="product image" />
                        <p className='px-5 m-0'>{i.name}</p>
                    </div>
                    <p className='my-3'>Price :  <span style={{fontWeight:'bold'}}>{i.quantity} x $</span><span style={{fontWeight:'bold'}}>{i.price}  = $</span><span style={{fontWeight:'bold'}}>{i.price * i.quantity}</span></p>
                    <hr />
                </div>
            )}

            <p style={{fontWeight:"bold"}}>Shipping Price : ${order?.shippingPrice}</p>
            <p style={{fontWeight:"bold"}}>Tax Price : ${order?.taxPrice}</p>
            <p style={{fontWeight:"bold"}}>Total Price : ${order?.totalPrice}</p>

                <hr />
            <div class="row mb-3 px-3 mt-5">
                    { !order?.isPaid && !user?.isAdmin && 
                    <div className='text-center'>
                        <PayPalButton onError={onPayErrorHandler} amount={order?.totalPrice} onSuccess={paySuccessHandler}/>
                    </div> 
                    }
                    { deliverOrderLoading && <Spinner style={{margin:'0 auto'}} animation="border"></Spinner> }
                    { !deliverOrderLoading &&  user?.isAdmin && !order?.isDelivered && order?.isPaid && <button onClick={deliverHandler} className='btn btn-primary'>Mark as delivered</button> }
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Order;