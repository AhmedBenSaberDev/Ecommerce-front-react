import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getUsersList , deleteUser } from '../../feature/usersSlice';

import { AiFillCheckCircle , AiFillCloseCircle } from 'react-icons/ai';

import { Spinner , Col} from 'react-bootstrap';

import Modal from '../../components/Modal'

import Pagination from '../../components/Pagination';

import './usersList.css';

const UsersList = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch();
	const  { user } = useSelector(state => state.user);
	const  { usersList , isSuccess , isLoading , isError } = useSelector(state => state.users);
	

	const [showModal,setShowModal] = useState(false);
	const [deleteConfirm,setDeleteConfirm] = useState(false);

	const [userId,setUserId] = useState('');

	const [itemsPerPage,setItemsperPage] = useState(5);
	const [currentPage,setCurrentPage] = useState(1);

	const lastItemIndex = itemsPerPage * currentPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const users = usersList?.slice(firstItemIndex,lastItemIndex);

	useEffect(() => {
		if(!user.isAdmin){
			navigate('/');
			return;
		}
		dispatch(getUsersList(user.token));
	},[isSuccess]);


  return (
    <div class="container-xl"  >
		{isLoading ? <Col style={{minHeight:'75vh'}} className="d-flex justify-content-center align-items-center"><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col>
	:
	<>
	<Modal handleClose={() => {setShowModal(false)}} deleteItem={() => {dispatch(deleteUser({userToken:user.token,userId})); setUserId(''); setShowModal(false);}} showModal={showModal}></Modal>
	<div class="table-responsive">
		
	<div class="table-wrapper">
		<div class="table-title">
			<div class="row">
				<div class="col-sm-6">
					<h2>Manage <b>Users</b></h2>
				</div>
			</div>
		</div>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>NAME</th>
					<th>Email</th>
					<th>Admin</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{ users?.map(u => 

					<tr key={u._id}>
					<td>{u._id}</td>
					<td>{u.name}</td>
					<td>{u.email}</td>
					<td>{u.isAdmin ? <AiFillCheckCircle style={{fontSize:"22px",color:"#5cb85c"}}/> : <AiFillCloseCircle style={{fontSize:"22px",color:"#d9534f"}}/>}</td>
					<td>
						<a onClick={() => {navigate(`/user/${u._id}/edit`)}}><i class="material-icons text-warning" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
						<a onClick={() => {setShowModal(true);  setUserId(u._id)}}><i class="material-icons text-danger" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
					</td>
				</tr>
					) }
				
			</tbody>
		</table>
		<div class="clearfix">
			<Pagination itemsPerPage={itemsPerPage} paginate={(n) => {setCurrentPage(n)}} totalItems={usersList?.length} ></Pagination>
		</div>
	</div>
	</div>  
	</>
	}
		      
    </div>
  )
}

export default UsersList;