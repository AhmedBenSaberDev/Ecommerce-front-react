import React, { useEffect, useState } from "react";

import { useNavigate , Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getProducts , reset } from "../../feature/product.slice";

import { deleteProduct , deleteReset } from "../../feature/adminProductSlice";

import { Spinner, Col  } from "react-bootstrap";

import Modal from "../../components/Modal";

import Pagination from '../../components/Pagination'

import { toast } from "react-toastify";


const ProductList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.user);

  const { products , isSuccess, isLoading, isError } = useSelector(
    (state) => state.products
  );

  const { deleteSuccess , deleteLoading , deleteError } = useSelector(
    (state) => state.adminProducts
  );

  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);

  const [productId, setProductId] = useState("");
  const [itemsPerPage,setItemsPerPage] = useState(5);

  const lastItemIndex = itemsPerPage * currentPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const productsSliced = products?.slice(firstItemIndex,lastItemIndex);

  useEffect(() => {
    if(!user.isAdmin){
      return navigate('/');
    }
    if(deleteSuccess){
      toast.success('Product deleted successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      dispatch(getProducts());
      
    }
    if(deleteError){
      toast.error('An error occured', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(deleteReset());
    }
    dispatch(deleteReset());
    dispatch(reset());
    
  },[isSuccess,deleteSuccess,deleteError]);

  useEffect(() => {
    dispatch(getProducts());
  },[]);
  
  return (
    <div class="container-xl">
      {isLoading || deleteLoading ? (
        <Col
          style={{ minHeight: "75vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner
            style={{ height: "100px", width: "100px" }}
            animation="border"
          />
        </Col>
      ) : (
        <>
          <Modal
            handleClose={() => {
              setShowModal(false);
            }}
            deleteItem={() => {
              console.log("ok");
              dispatch(deleteProduct({ userToken: user.token, productId }));
              setProductId("");
              setShowModal(false);
            }}
            showModal={showModal}
          ></Modal>
          <div class="table-responsive">
            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-6">
                    <h2>Products</h2>
                  </div>
                  <div class="col-sm-6">
                    <Link to={'/admin/product/add'}
                      class="btn btn-success"
                    >
                      <div className="d-flex align-items-center">
                        <i class="material-icons">&#xE147;</i>{" "}
                        <span>Add New Product</span>
                      </div>
                      </Link>
                  </div>
                </div>
              </div>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>NAME</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                  </tr>
                </thead>
                <tbody>
                  {productsSliced?.map((p) => (
                    <tr key={p._id}>
                      <td>{p._id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.brand}</td>
                      <td>
                        <a
                          onClick={() => {
                            navigate(`/admin/product/${p._id}/edit`);
                          }}
                        >
                          <i
                            class="material-icons text-warning"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                            &#xE254;
                          </i>
                        </a>
                        <a
                          onClick={() => {
                            setShowModal(true);
                            setProductId(p._id);
                          }}
                        >
                          <i
                            class="material-icons text-danger"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xE872;
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div class="clearfix">
                <Pagination itemsPerPage={itemsPerPage} paginate={(n) => {setCurrentPage(n)}} totalItems={products?.length}></Pagination>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
