import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useEditVariantMutation,
  useGetVariantQuery,
} from "../../slices/productsApiSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditVariantScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: variant } = useGetVariantQuery(id);

  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [updateVariant, { isLoading: loadingUpdateProfile }] =
    useEditVariantMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateVariant({
        vId: id,
        stock,
        color,
        size,
        price,
      }).unwrap();
      window.alert("variant updated successfully");
      navigate(`/admin/products/${variant._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (variant) {
      setSize(variant.variant[0].size);
      setColor(variant.variant[0].color);
      setPrice(variant.variant[0].price);
      setStock(variant.variant[0].stock);
    }
  }, [variant]);

  return (
    <>
      <Link to="/admin/users">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Edit variant</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email2">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {loadingUpdateProfile && <p>Loading..</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default EditVariantScreen;
