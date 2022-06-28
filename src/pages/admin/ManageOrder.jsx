import React ,{ useEffect , useState  } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate , Link } from 'react-router-dom';

import { Spinner , Col} from 'react-bootstrap';

import { AiFillCheckCircle , AiFillCloseCircle } from 'react-icons/ai';

import { fetchAllOrders } from '../../feature/orderSlice';
import Pagination from '../../components/Pagination';


const ManageOrder = () => {

	

	const [currentPage,setCurrentPage] = useState(1);
	const [ordersPerPage,setOrdersPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allOrders ,allOrdersLoading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchAllOrders(user.token));
    },[]);

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
	const orders = allOrders?.slice(indexOfFirstOrder,indexOfLastOrder);

  return (
    <div class="container-xl"  >
		{allOrdersLoading ? <Col style={{minHeight:'75vh'}} className="d-flex justify-content-center align-items-center"><Spinner style={{height:'100px',width:'100px'}}  animation="border" /></Col>
	:
	<>
	<div class="table-responsive">
		
	<div class="table-wrapper">
		<div class="table-title">
			<div class="row">
				<div class="col-sm-6">
					<h2>Manage Orders</h2>
				</div>
			</div>
		</div>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Date</th>
					<th>Total</th>
					<th>Paid</th>
					<th>Delivered</th>
				</tr>
			</thead>
			<tbody>
				{ orders?.map(u => 

					<tr key={u._id}>
					<td>{u._id}</td>
					<td>{u.createdAt?.substring(0,10)}</td>
					<td>${u.totalPrice}</td>
                    <td>{u.isPaidAt ? <AiFillCheckCircle style={{fontSize:"22px",color:"#5cb85c"}}/> : <AiFillCloseCircle style={{fontSize:"22px",color:"#d9534f"}}/>}</td>
					<td>{u.isDelivered ? <AiFillCheckCircle style={{fontSize:"22px",color:"#5cb85c"}}/> : <AiFillCloseCircle style={{fontSize:"22px",color:"#d9534f"}}/> }</td>
					<td><Link to={`/order/${u._id}`}><button  style={{fontSize:'12px'}} class='btn btn-sm btn-info'>Details</button></Link></td>
				</tr>
					) }
				
			</tbody>
		</table>
	</div>
		<div class="clearfix">
			<Pagination paginate={(n) => {setCurrentPage(n)}} itemsPerPage={ordersPerPage} totalItems={allOrders.length} ></Pagination>
		</div>
	</div>  
	</>
	}
		      
    </div>
  )
}

export default ManageOrder;