import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { removefromcart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };

  const checkoutHandler = () => {
    navigate("/method");
  };

  return (
    <Row>
      <Col md={9}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h4>
            Your cart is empty <Link to="/">Go Back</Link>
          </h4>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>Price: ${item.price}</Col>
                  <Col>Size: {item.size}</Col>
                  <Col>Qty: {item.qty}</Col>
                  <Col md={2}>Color: {item.color}</Col>

                  <Col>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      ❌
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
