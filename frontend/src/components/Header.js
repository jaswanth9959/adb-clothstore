import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar expand="md" collapseOnSelect className="text-primary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>Clothing Store</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={"Welcome " + userInfo.user.firstname}
                    id="username"
                  >
                    {userInfo.user.role === "admin" ? (
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <>
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                          <NavDropdown.Item>Cart</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/myorders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                  {userInfo.user.role === "admin" && (
                    <NavDropdown title="dashboard" id="dashboard">
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Manage Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/categories">
                        <NavDropdown.Item>Manage Categories</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
    </header>
  );
}

export default Header;
