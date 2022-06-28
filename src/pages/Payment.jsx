import React, { useState } from "react";

import { BsPause } from 'react-icons/bs';

import Shipping from "../components/payment/Shipping";
import Methods from "../components/payment/Methods";

import './payment.css';
import Order from "../components/payment/Order";

const Payment = () => {
    const [currentComponent,setCurrentComponent] = useState("shipping");

    const switchOrderStep = (cp) => {
        setCurrentComponent(cp);
    }

  return (
     <div className="container pt-5 col-sm-12 d-flex justify-content-center">
        <div className="col-sm-6">
            <ul className="d-flex justify-content-center col-sm-12" id="progressbar">
                <li className={currentComponent == "shipping"  || currentComponent == "payment" || currentComponent == "order" ? "active steps" : 'steps'} id="personal">
                    <strong>Shipping</strong>
                </li>
                <li  className={currentComponent == "payment"  || currentComponent == "order" ? "active steps" : 'steps'} id="payment">
                    <strong>Payment</strong>
                </li>
                <li  className={currentComponent == "order"  ? "active steps" : 'steps'} id="confirm">
                    <strong>Place Order</strong>
                </li>
            </ul>
            {currentComponent  == "shipping" && <Shipping switchOrderStep={(cp) => {switchOrderStep(cp)}}></Shipping> }
            {currentComponent == "payment" && <Methods  switchOrderStep={(cp) => {switchOrderStep(cp)}}></Methods>}
            {currentComponent  == "order" && <Order switchOrderStep={(cp) => {switchOrderStep(cp)}}></Order>}
        </div>
     </div>
  );
};

export default Payment;
