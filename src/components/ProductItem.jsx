import React from 'react';

import { Link } from 'react-router-dom';

import Rating from './Rating';

import env from "react-dotenv";

import classes from './productItem.module.css';

const ProductItem = ({ product }) => {


  return (

        <Link to={`/product/${product._id}`}>
            {/* <div className={classes.bbb_deals}>
                <div className={classes['bbb_deals_slider_container']}>
                    <div className={classes['bbb_deals_item']}>
                        <div className={classes['bbb_deals_image']}><img src={process.env.REACT_APP_BACKEND_ENDPOINT + product.image} alt=""/></div>
                        <div className={classes['bbb_deals_content']}>
                            <div className={`${classes['bbb_deals_info_line']} d-flex flex-row justify-content-start`}>
                                <div className={classes['bbb_deals_item_category']}><a href="#">{product.category}</a></div>
                            </div>
                            <div className={`${classes['bbb_deals_info_line']} d-flex flex-row justify-content-start`}>
                                <div className={classes['bbb_deals_item_name']}>{product.name}</div>
                                <div className={`${classes['bbb_deals_item_price']} ms-auto`}>$ {product.price}</div>
                            </div>
                            <div className={classes.available}>
                                <div className={`${classes['available_line']} d-flex flex-row justify-content-start`}>
                                    <div className={classes['available_title']}>Available: <span>{product.countInStock}</span></div>
                                    <div className={`ms-auto`}><Rating value={product.rating}></Rating></div>
                                </div>
                                <div className={classes.available_bar}><span style={{width:'17%'}}></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

               <div class="mt-5">
                    <div className={classes['card']}>
                        <div className={classes['card-body']} >
                            <div className={classes['card-img-actions']}>                                       
                                <img className={classes['card-img']} src={process.env.REACT_APP_BACKEND_ENDPOINT + product.image} height="250" width='250' alt=""/>                                       
                            </div>
                        </div>
                        <div class={`${classes['card-body']} text-center bg-light `}>
                            <div class="mb-2">
                                <h6 class="font-weight-semibold mb-2">
                                    <a class="text-default mb-2" data-abc="true">{product.name}</a>
                                </h6>
                                <a href="#" class="text-muted" data-abc="true">{product.category}</a>
                            </div>
                            <h3 class="mb-0 font-weight-semibold">${product.price}</h3>
                            <div className="my-1">
                               <Rating value={product.rating}></Rating>
                            </div>
                            <div class="text-muted mb-3">{product.numReviews} reviews</div>
                            <button type="button" class="btn btn-primary">more details</button>
                        </div>
                    </div>                    
               </div> 
        </Link>
  )
}

export default ProductItem