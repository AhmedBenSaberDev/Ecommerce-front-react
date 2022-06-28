import React , {useEffect , useState} from 'react';

import { useParams , useNavigate} from 'react-router';

import { useDispatch, useSelector } from 'react-redux';

import { editProduct, reset } from '../../feature/editProductSlice';

import { getProductDetails } from '../../feature/singleProductSlice';

import { useFormik } from "formik";

import * as Yup  from "yup"; 

import { toast } from 'react-toastify';


const UpdateProduct = () => {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {product} = useSelector(state => state.singleProduct);
  const {isLoading , isError , isSuccess } = useSelector(state => state.editProduct);
  const {user} = useSelector(state => state.user);


  const [image,setImage] = useState();
  const [imageError,setImageError] = useState();

  function fileValidation(file) {
 
    var allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.gif)$/i;
     if(!file){
      setImageError("Image is required") 
      return;
     }
    if (!allowedExtensions.exec(file)) {
        setImageError("Invalid extension") 
        return false;
    }
    return true;
  }

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        name :product?.name ,
        price : product?.price,
        brand : product?.brand,
        category : product?.category,
        countInStock : product?.countInStock,
        description : product?.description
    },
    validationSchema:Yup.object({
        name:Yup.string().required('Name is required'), 
        price:Yup.number("Price must be a number").positive("Price must be a positive number").min(1).required('Price is required'),
        brand:Yup.string().required('Brand code is required'),
        category:Yup.string().required('Category is required'),
        countInStock:Yup.number("Count in stock should be a number").min(0).required('Count in stock is required'),
        description:Yup.string().required('Description is required')
    }),
    onSubmit:async ({name,price,brand,category,countInStock,description}) => {
     if(fileValidation(image?.name)){

      const formData = new FormData();

      formData.append('name',name)
      formData.append('price',price)
      formData.append('brand',brand)
      formData.append('category', category)
      formData.append('countInStock',countInStock);
      formData.append('description',description);
      formData.append('image',image);
        dispatch(editProduct(
          {
            userToken:user.token,
            productId:params.id,
            formData
          }
        ))
      }
    }
  });

  useEffect(() => {
    if(!product || product?._id !== params.id){
      dispatch(getProductDetails(params.id));
    }
  },[product,isSuccess]);

  useEffect(() => {
    if(isSuccess){
      toast.success('Product updated successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(reset());
      navigate('/admin/products')
    }
    if(isError){
      toast.error('An error occured', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(reset());
    }
  },[isSuccess,isError])

  return (
    <div class="card card0 border-0">
        {/* {isLoading || updateLoading ? <Col style={{minHeight:'75vh'}} className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col> :  */}
                <form class="col-lg-12" onSubmit={formik.handleSubmit}>
                    <div className='d-flex justify-content-center'>
                    <div className="col-lg-6">
            
                        <div class="card2 card border-0 px-4 py-5">

                            <div class="row px-3 mb-4">             
                                <h2 class="text-center">Edit Product</h2>
                            </div>
                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.name ? "* " + formik.errors.name : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Name</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.name} name="name" class="mb-4" type="text" placeholder="Name"/>
                            </div>
                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.price ? "* " + formik.errors.price : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Price</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.price} name="price" class="mb-4" type="number" placeholder="Price"/>
                            </div>

                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {imageError ? "* " + imageError : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Image</h6></label>
                                <input onChange={(e) => {setImage(e.target.files[0])}} class="mb-4" type="file" placeholder="Image"/>
                            </div>

                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.brand ? "* " + formik.errors.brand : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Brand</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.brand}  name="brand" class="mb-4" type="text" placeholder="Brand"/>
                            </div>

                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.category ? "* " + formik.errors.category : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Category</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.category} name="category" class="mb-4" type="text" placeholder="Category"/>
                            </div>

                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.countInStock ? "* " + formik.errors.countInStock : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Count in stock</h6></label>
                                <input onChange={formik.handleChange} value={formik.values.countInStock} name="countInStock" class="mb-4" type="number" placeholder="Count in stock"/>
                            </div>

                            <div class="row px-3">
                                <span style={{fontSize:"13px",transform:'translateX(-10px)'}} className='text-danger mt-2 mb-1'> {formik.errors.description ? "* " + formik.errors.description : ''}</span>
                                <label class="mb-1"><h6 class="mb-0 text-sm">Description</h6></label>
                                <textarea rows={5} onChange={formik.handleChange} value={formik.values.description} name="description" class="mb-4" type="text" placeholder="Description"/>
                            </div>
                          

                            <div class="row mb-3 p-3">
                                <button type="submit" class="btn btn-dark text-center">Edit</button>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </form>
        {/* } */}
        </div>
  )
}

export default UpdateProduct