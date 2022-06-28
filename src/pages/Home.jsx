import React , { useState , useEffect, useRef } from 'react';

import ProductItem from '../components/ProductItem';

import { Row , Col, Spinner} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { getProducts, setProducts } from '../feature/product.slice';

import Pagination from '../components/Pagination.jsx';

import { toast } from 'react-toastify';

const Home = () => {

  const dispatch = useDispatch();
  const {products , isError , isLoading} = useSelector((state) => state.products);
  const [currentPage,setCurrentPage] = useState(1);
	const [productsPerPage,setProductsPerPage] = useState(8);

  const scroll = useRef();

  useEffect(() => {
    dispatch(getProducts());
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
    } 
  },[isError]);

  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth'})

  const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const productsSliced = products?.slice(indexOfFirstProduct,indexOfLastProduct);

  return (
    <div className='py-5'>
        <h1>Latest Products</h1>
        <div ref={scroll}></div>
        <Row>
          { isLoading ? <Col style={{minHeight:'60vh'}} className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col>  :  productsSliced?.map(p => <Col key={p._id} sm={12} md={6} lg={4} xl={3} > <ProductItem key={p._id}  product={p} ></ProductItem> </Col>)}
          <div className='text-center mt-5 px-5'>
            <Pagination paginate={(n) => {setCurrentPage(n); scrollToRef(scroll)}} itemsPerPage={productsPerPage} totalItems={products?.length} ></Pagination>
          </div>
        </Row>
    </div>
  )
}

export default Home;