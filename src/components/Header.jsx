import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {Navbar , Container , NavDropdown , Nav , Badge} from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../feature/userSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {items} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <Navbar bg="light"  collapseOnSelect expand="lg">
  <Container>
    <Navbar.Brand><Link to={"/"}>My Shop</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        
        <Nav.Link className='d-flex'>
          <Link to={'/cart'}><FiShoppingCart style={{fontSize:"20px",marginRight:"8px"}} />
          { items?.length > 0 && <Badge style={{position:"absolute",top:'0',left:"20px"}} pill bg="danger">
                {items?.length}
            </Badge>}
            Cart 
          </Link>
        </Nav.Link>
        { !user ? <Nav.Link className='d-flex'><Link to={"/signin"}><BiUser style={{fontSize:"20px",marginRight:"4px"}}/>Sign In</Link></Nav.Link>:
          <NavDropdown
          id="nav-dropdown-dark-example"
          title={user.name}
          menuVariant="dark"
        >
          { user.isAdmin &&  <> 
          <NavDropdown.Item>
            <Link to={"/admin/users"}>Manage Users</Link>
          </NavDropdown.Item> 
          <NavDropdown.Item>
            <Link to={"/admin/products"}>Manage Products</Link>
            </NavDropdown.Item> <NavDropdown.Item>
              <Link to={"/admin/orders"}>Manage Orders</Link>
              </NavDropdown.Item></>}
              <NavDropdown.Item ><Link to={'/orders'}>My Orders</Link></NavDropdown.Item>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          
          </NavDropdown>
          }

          
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header;