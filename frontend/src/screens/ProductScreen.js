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
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const handleAdd = (variant) => {
    dispatch(
      addTocart({
        ...variant,
        id: product._id,
        image: product.image,
        name: product.name,
        brand: product.brand,
        qty,
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
                  <strong>{product.brand}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>{product.category}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <h2 className="p-3 text-center">All Variants</h2>
          <Row>
            {product.variant.map((v) => (
              <Col md={4}>
                <Card className="my-3 p-3 rounded">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${v.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Stock:</Col>
                        <Col>{v.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Size:</Col>
                        <Col>{v.size}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Color:</Col>
                        <Col>{v.color}</Col>
                      </Row>
                    </ListGroup.Item>

                    {/* Qty Select */}
                    {v.stock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={() => handleAdd(v)}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
