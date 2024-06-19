import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import { addTocart } from "../slices/cartSlice";
function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const { id: productId } = useParams();
  const [selectId, setSelectesId] = useState(null);
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const handleChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setSize(e.target.value);
    setSelectesId(Number(option));
  };

  const handleAdd = () => {
    if (size === "") {
      window.alert("select size!!");
      return;
    }
    dispatch(
      addTocart({
        id: product._id,
        image: product.image,
        name: product.name,
        brand: product.brand,
        qty,
        size,
        color: product.color,
        price: product.price,
        selectId,
      })
    );
    navigate("/cart");
  };
  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Row>
            <Col md={{ offset: 2, span: 5 }}>
              <Image
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Brand: <strong>{product.brand}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Category: <strong>{product.category.name}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <h2 className="p-3 text-center">Select Variant</h2>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="my-3 p-3 rounded">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                      <Row>
                        <Col>Stock:</Col>
                        <Col>{v.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                      </Row>
                    </ListGroup.Item> */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Select Size:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={size}
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select Size</option>
                          {product.size.map((x, id) => (
                            <option key={id} id={Number(id)} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Color:</Col>
                      <Col>{product.color}</Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}

                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(3).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={handleAdd}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
