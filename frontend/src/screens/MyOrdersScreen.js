import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Link } from "react-router-dom";
function MyOrdersScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery(userInfo.user._id);
  return (
    <div>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>My Orders</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid
                        ? new Date(order.paidAt).toLocaleDateString("en-US")
                        : "❌"}
                    </td>
                    <td>
                      {order.isCompleted
                        ? new Date(order.completedOn).toLocaleDateString(
                            "en-US"
                          )
                        : "❌"}
                    </td>
                    <td>
                      <Button
                        as={Link}
                        to={`/order/${order._id}`}
                        className="btn-sm"
                        variant="primary"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default MyOrdersScreen;
