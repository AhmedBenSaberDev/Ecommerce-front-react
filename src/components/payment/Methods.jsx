
import React from 'react';


const Methods = (props) => {
  return (
    <div class="card card0 border-0">
    <form class="col-lg-12">
        <div className='d-flex justify-content-center'>
        <div className="col-lg-12">

            <div class="card2 card border-0 px-4 py-5">

            <table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark"/></a></td></tr></table>
                <div class="d-flex align-items-center px-3">
                  <input class="col-sm-1" checked style={{border:"1px solid black"}}  type="radio" placeholder="Address" />
                  <label>Paypal or cedit card</label>
                  
                </div>
                

                <div class="row mb-3 px-3 mt-5">
                    <button onClick={() => {props.switchOrderStep("shipping")}}  type="submit" class=" my-1 btn btn-dark text-center">Back</button>
                    <button onClick={() => {props.switchOrderStep("order")}}  type="submit" class=" my-1 btn btn-dark text-center">Continue</button>
                </div>
                
            </div>
        </div>
        </div>
    </form>
</div>)
}

export default Methods;