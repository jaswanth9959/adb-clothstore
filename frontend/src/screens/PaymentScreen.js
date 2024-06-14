import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useState } from "react";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    method,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        userId: userInfo.user._id,
        orderItems: cartItems,
        cardNumber: card,
        email: userInfo.user.email,
        orderDetails: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }).unwrap();
      dispatch(clearcart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Payment Section</h1>
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
                  <Col md={2}>Brand: {item.brand}</Col>
                  <Col md={2}>Price: ${item.price}</Col>
                  <Col md={2}>Size: {item.size}</Col>
                  <Col md={2}>Color: {item.color}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Total: </Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Amount:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {method === "Delivery" && (
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Amount</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Total Amount</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form>
                  <Form.Group className="my-2" controlId="address">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Card Number"
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="address2">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="address3">
                    <Form.Label>Vaild Thru</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YYYY"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Form>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Pay ${totalPrice}
                </Button>
                {isLoading && <p>Loading....</p>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default PaymentScreen;
