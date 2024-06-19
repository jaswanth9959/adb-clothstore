import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
  useUpdatePickupStatusMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useUpdateOrderStatusMutation();

  const [pickupOrder, { isLoading: loadingPickup }] =
    useUpdatePickupStatusMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const deliverHandler2 = async () => {
    await pickupOrder(orderId);
    refetch();
  };
  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <p>Loading..</p>
  ) : error ? (
    <p>{error.data.message}</p>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Customer Details:</h2>
              <p>
                <strong>Name: </strong> {order.user.firstname}{" "}
                {order.user.lastname}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <h6>
                <strong>Order Type</strong> : {order.orderType}
              </h6>
              {order.shippingPrice === 0.0 ? (
                <p>
                  <strong>Pick up Details :</strong> {order.orderDetails}
                </p>
              ) : (
                <p>
                  <strong>Address : </strong> {order.orderDetails}
                </p>
              )}

              <h4 style={{ color: "green" }}>Order Status:</h4>
              {order.orderStatus === "Order is Completed." ? (
                <>
                  <h5 style={{ color: "green" }}>
                    Order Completed on{" "}
                    {new Date(order.completedOn).toLocaleDateString("en-US")}{" "}
                    {new Date(order.completedOn).toLocaleTimeString("en-US")}
                  </h5>
                  <h6>By: {order?.deliveredBy}</h6>
                </>
              ) : (
                <h5>{order.orderStatus}</h5>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <h5 style={{ color: "green" }}>
                  Paid on {new Date(order.paidAt).toLocaleDateString("en-US")}{" "}
                  {new Date(order.paidAt).toLocaleTimeString("en-US")}
                </h5>
              ) : (
                <h5>Not Paid</h5>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <p>Order is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>Brand:{item.brand}</Col>
                        <Col>Color: {item.color}</Col>
                        <Col>size:{item.size}</Col>
                        {/* <Col></Col> */}
                        <Col>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <p>Loading...</p>}
              {loadingPickup && <p>Loading..</p>}
              {userInfo &&
                userInfo.user.role === "admin" &&
                order.isPaid &&
                order.orderStatus === "Order Received. We will process soon." &&
                order.orderType === "Pickup" && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Completed
                    </Button>
                  </ListGroup.Item>
                )}

              {userInfo &&
                userInfo.user.role === "admin" &&
                order.isPaid &&
                order.orderType === "Delivery" &&
                order.orderStatus !== "Order is Completed." && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      {order.orderStatus ===
                        "Order Received. We will process soon." &&
                        "Mark As Out For Delivery"}
                      {order.orderStatus ===
                        "Order Is Ready. Will be Delivered Soon." &&
                        "Mark As Out For Delivery"}
                      {order.orderStatus === "Out For Delivery" &&
                        "Mark As Delivered"}
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
