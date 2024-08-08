import {Navbar ,Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';
const Header = () =>{
    return (
      <>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to='/'>myApp</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to='/' className='nav-link'>Dashboard</Nav.Link>
            <Nav.Link as={Link} to='/furniture' className='nav-link'>Add Furniture</Nav.Link>
            <Nav.Link as={Link} to='/export' className='nav-link'>Add Export</Nav.Link>
            <Nav.Link as={Link} to='/getFurniture' className='nav-link'>Get Furniture</Nav.Link>
            <Nav.Link as={Link} to='/getExport' className='nav-link'>Get Export</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    );
  }
  export default Header;