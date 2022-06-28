
import React , {useEffect , useState} from 'react';
import {Form ,Col ,Spinner , Alert} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getUserInfo , reset, updateUser } from '../../feature/userInfoSlice';

const UpdateUser = (history) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo , isLoading , isSuccess , updateError ,  updateSuccess , updateLoading} = useSelector(state => state.userInfo);
    const {user} = useSelector(state => state.user);

    const params = useParams();

    const  [name, setName] = useState();
    const  [email, setEmail] = useState();
    const  [isAdmin, setIsAdmin] = useState();
    const [errors,setErrors] = useState(false);
    
    useEffect(() => {
        if(!userInfo?.name || userInfo._id != params.id){
            dispatch(getUserInfo({userToken:user.token,id:params.id}));
        }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
            setIsAdmin(userInfo.isAdmin)
        }
        
    },[userInfo]);

    useEffect(() => {
        if(updateSuccess){
            toast.success('User updated successfuly', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setErrors(false);
                dispatch(reset());
                navigate('/admin/users');
        }
        if(updateError){
            toast.error(updateError, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                dispatch(reset());
        }
    },[updateSuccess,updateError]);

    const updateHandler = (e) => {
        e.preventDefault();

        if(!name || !email){
            setErrors("Name and email fields are required");
            return;
        }
        const userData = {
            name,
            email,
            isAdmin
        }

        dispatch(updateUser({userToken:user.token,id:params.id,userData}));
    };
    
  return (
    <div class="card card0 border-0">
        {isLoading || updateLoading ? <Col style={{minHeight:'75vh'}} className='d-flex justify-content-center align-items-center' sm={12} ><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col> : 
                <form class="col-lg-12">
                    <div className='d-flex justify-content-center'>
                    <div className="col-lg-6">
            
                        <div class="card2 card border-0 px-4 py-5">

                            <div class="row px-3 mb-4">             
                                <h2 class="text-center">Edit User</h2>
                            </div>
                            {errors && <Alert variant='danger'>{errors}</Alert>}
                            <div class="row px-3">
                                <label class="mb-1"><h6 class="mb-0 text-sm">Name</h6></label>
                                <input onChange={(event) => setName(event.target.value)} value={name} class="mb-4" type="text" placeholder="Address"/>
                            </div>
                            <div class="row px-3">
                                <label class="mb-1"><h6 class="mb-0 text-sm">Email</h6></label>
                                <input onChange={event => setEmail(event.target.value)} value={email} class="mb-4" type="text" placeholder="Address"/>
                            </div>
                            
                            <Form.Check 
                                onChange={(e) => {setIsAdmin(e.target.checked)}}
                                checked={isAdmin}
                                type="switch"
                                label="Is Admin"
                            />

                            <div class="row mb-3 p-3">
                                <button onClick={updateHandler} type="submit" class="btn btn-dark text-center">Update</button>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </form>
        }
        </div>
  )
}

export default UpdateUser;