import React ,{ useEffect , useState }from "react";

import Rating from "../components/Rating";

import { Container , Row ,  Col, Spinner , Form, Button, Alert} from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../feature/Cart.Slice";

import { toast } from "react-toastify";

import { getProductDetails } from "../feature/singleProductSlice";

import { addReview , reset } from "../feature/addReviewSlice";

import Pagination from '../components/Pagination';

import classes from './product.module.css';



const Product = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [quantity,setQuantity] = useState(1);
  const [rating,setRating] = useState();
  const [comment,setComment] = useState();
  const [reviewFieldError,setReviewFieldError] = useState(false);

  const { user } = useSelector(state => state.user);
  const {product , isError , isLoading } = useSelector((state) => state.singleProduct);
  const { addReviewLoading , addReviewSuccess , addReviewError } = useSelector(state => state.addReview);

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  },[]);

  useEffect(() => {
    if(isError){
      toast.error('Oups! ,  An Error Occured', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/');
    }
    
  },[isError])

  const addToCartHandler = () => {
    dispatch(addItem({...product,quantity}));
    toast.success(`${product.name} added successfully to your cart`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const addReviewHandler = () => {

    if(!user){
      toast.info('Pleas log in to add a review', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/signin');
      return
    }

    if(rating || comment){
      
      const review = {
        name:user.name,
        rating,
        comment
      }
      dispatch(addReview({userToken:user.token,productId:params.id,review}));
    }else{
      setReviewFieldError(true);
    }
  }

  useEffect(() => {
    if(addReviewSuccess){
      setReviewFieldError(false);
      setRating(0)
      setComment('')
      dispatch(reset());
    }
    dispatch(getProductDetails(params.id));
  },[addReviewSuccess,dispatch]);

  useEffect(() => {
    if(addReviewError){
      toast.error('An error occured', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  },[addReviewError]);


  return (
      <Container className="mt-5 mb-5">
        <div className={classes.Card}>
          {isLoading ? <Col style={{minHeight:'60vh'}} className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col> : <Row className="g-0">
            <Col md={6} className="border-end">
              <div className="d-flex flex-column justify-content-center">
                <div className={classes.main_image}>
                  <img
                    src={process.env.REACT_APP_BACKEND_ENDPOINT + product?.image}
                    id="main_product_image"
                    width="350"
                  />
                </div>
                
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 right-side">
                <div className="d-flex justify-content-between align-items-center align-items-baseline">
                  <h3>{product?.name}</h3>
                </div>
                <div className={`${classes.content} mt-2 pr-3`}>
                  <p>
                    {product?.description}
                  </p>
                </div>
                <h3 className="mt-4">${product?.price}</h3>
                { product?.countInStock <= 0 ?  <p className="mt-3 text-danger" style={{fontWeight:"bold"}}>Out of Stock</p> : <p  className="mt-3">Quantity in stock :<span style={{fontWeight:"bold"}}> {product?.countInStock}</span></p>}
                <div className={`d-flex flex-row align-items-baseline`}>
                  <div className="d-flex flex-row">
                    {<Rating value={product?.rating}></Rating>}     
                  </div>
                  <span className="px-5">{product?.numReviews} Review(s)</span>
                </div>
                <Form.Group  className="d-flex align-items-baseline">
                <Form.Label  htmlFor="quantity">Quantity :</Form.Label>
                <Form.Select onChange={(e) => {setQuantity(e.target.value)}} style={{width:"30%",marginLeft:'20px'}} id='quantity' className="mt-3" size="sm" >                  
                  { [...Array(product?.countInStock).keys()].map(x => 
                    <option key={x} value={x + 1}>{x+1}</option>
                  )}
                   
                </Form.Select>
                </Form.Group>
                <div className={`d-flex flex-row mt-5 gap-3`}>
                  <button onClick={() => {navigate('/')}} className='btn btn-primary'>back to shopping</button>
                  <button onClick={addToCartHandler} className={`btn btn-outline-dark  ${product?.countInStock == 0 ? 'disabled' : ''}` }>Add to Basket</button>
                </div>
              </div>
            </Col>

            <Col className="flex-column d-flex justify-content-center align-items-center mt-5 mb-3">
                <h3 className="mt-5">Add Review</h3>
                <Row>
                  { reviewFieldError && <Col className="text-center d-flex justify-content-center "><Alert className="col-sm-6" variant="danger"> <p>rating and comment are required</p> </Alert> </Col>}
                    
                  
                <Form.Group className="text-right">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select  onChange={(e) => {setRating(e.target.value)}}  id='review' name="review" className="mt-3" size="sm" >                  
                      <option value=''>select ...</option>
                      <option value='5'>5 - Excelent</option>
                      <option value='4'>4 - Good</option>
                      <option value='3'>3 - Average</option>
                      <option value='2'>2 - Poor</option>
                      <option value='1'>1 - Terrible</option>
                  </Form.Select>
                  

                </Form.Group>

                <Form.Group className="col-sm-12 mt-2">
                <Form.Label className="mt-2">Comment</Form.Label>
                  <Form.Control onChange={(e) => {setComment(e.target.value)}} placeholder="Add review ..." as="textarea" rows="3">
                    
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  { !addReviewLoading ? <Button onClick={addReviewHandler} type="submit" className="mt-2 col-sm-3">Submit</Button> : <Spinner animation="border"></Spinner>}  
                </Form.Group>
                </Row>
            </Col>

            <Row>
                <Col className="text-center mt-5">
                  <h3>Reviews ({product?.reviews.length})</h3> 
                </Col>  
                <Row className="d-flex justify-content-center ">
                { product?.reviews.map(r => 
                  <div class="card col-md-8 my-3 ">
                  <div class="card-body">
                      <div class="row">
                          <div class="col-md-12">
                              <div className="d-flex align-items-baseline">
                                <h5 class="me-2"><strong>{r.name}</strong></h5>
                                <Rating value={r.rating}></Rating>
                              </div>
                            <div class="clearfix"></div>
                              <p>{r.comment}</p>
                          </div>
                      </div>
                  </div>
	              </div>
                ) }
                </Row>
            </Row>
          </Row>}
          
        </div>
      </Container>
  );
};

export default Product;
