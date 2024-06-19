import { Table, Button, Row, Col } from "react-bootstrap";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { Link } from "react-router-dom";
function CategoryScreen() {
  const { data: orders, isLoading, error } = useGetCategoriesQuery();
  return (
    <div>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2>Categories</h2>
          <Link to="/admin/category/add">
            <Button variant="primary">Add New Category</Button>
          </Link>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.name}</td>

                    <td>
                      <Button
                        as={Link}
                        to={`/admin/category/${order._id}`}
                        className="btn-sm"
                        variant="primary"
                      >
                        Edit
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

export default CategoryScreen;
