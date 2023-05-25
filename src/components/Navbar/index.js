import {
    Button,
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';

import { React, } from 'react';

import { connect } from "react-redux";
import { logoutUser } from "../../auth/actions/userActions";
import { useHistory } from "react-router-dom";

import logo from '../../assets/images/logoname.png';
import '../../styles/navbar.css'
//r
const OurNavar = ({ user }) => {
    const navigate = useHistory();

    return (
        <Navbar expand="lg">


            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt="logo" width="120" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {user.name ? <Nav.Link>Welcome {user.name}</Nav.Link> : null}
                        {user.admin ? <Nav.Link href="/message">Send message</Nav.Link> : null}
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <NavDropdown title="Comics" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/recomendadion">
                                Send recomendation
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/comic">
                                See posts
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/create">
                                Create Post
                            </NavDropdown.Item>
                        </NavDropdown>
                        {user.name ? null :
                            <NavDropdown title="Log in/Register" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/login">
                                    Log in
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/register">
                                    Register
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        {user.name ? <Button className='boton' onClick={() => logoutUser(navigate)}>Log out</Button> : null}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
const mapStateToProps = ({ session }) => ({
    user: session.user
})


export default connect(mapStateToProps, { logoutUser })(OurNavar);

// export default OurNavar;