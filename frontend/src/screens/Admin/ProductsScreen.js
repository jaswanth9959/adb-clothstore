import { Table, Button, Row, Col } from "react-bootstrap";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { Link, useNavigate } from "react-router-dom";
function ProductsScreen() {
  const navigate = useNavigate();
  const { data: products, isLoading, refetch, error } = useGetProductsQuery();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col md={12}>
          <h2>All Products</h2>
          <Link to="/admin/product/add">
            <Button variant="primary">Add New Product</Button>
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
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>Brand</th>
                  <th>CATEGORY</th>
                  <th>COLOR</th>
                  <th>SIZE OPTIONS</th>
                  <th>STOCK</th>
                  <th>PRICE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>
                      <img
                        src={`http://localhost:5000${product.image}`}
                        height={75}
                        width={100}
                        alt="img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category.name}</td>
                    <td>{product.color}</td>
                    <td>{product.size.join(",")}</td>
                    <td>{product.stock.join(",")}</td>
                    <td>{product.price}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/admin/products/${product._id}`)
                        }
                        to={`admin/products/${product._id}`}
                        className="btn-sm mx-2"
                        variant="primary"
                      >
                        Details
                      </Button>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {loadingDelete && <span>Loading...</span>}
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProductsScreen;
