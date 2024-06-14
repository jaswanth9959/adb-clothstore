import { useState, useEffect } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import {
  useGetProductByIdQuery,
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditProductScreen() {
  const { id: productId } = useParams();
  const { data: product, refetch } = useGetProductByIdQuery(productId);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const [createVariant, { isLoading: loadingProductReview }] =
    useCreateVariantMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const [deleteVariant, { isLoading: loading }] = useDeleteVariantMutation();

  const navigate = useNavigate();

  const submitHandler2 = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        image,
        brand,
        category,
        description,
      }).unwrap();
      window.alert("Product updated");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      window.alert(res.message);
      setImage(res.image);
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteVariant(id);
        refetch();
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createVariant({
        productId,
        size,
        stock,
        price,
        color,
      }).unwrap();
      refetch();
      window.alert("variant created successfully");
      setColor("");
      setSize("");
      setPrice("");
      setStock("");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setDescription(product.description);
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
    }
  }, [product]);

  return (
    <>
      <Link to="/admin/products">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Product Details</h2>
          {loadingUpdate && <p>Loading...</p>}
          <Form onSubmit={submitHandler2}>
            <Form.Group className="my-2" controlId="firstname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <p>Loading...</p>}
            </Form.Group>
            <Form.Group className="my-2" controlId="lastname">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email1">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {/* {loading && <p>Loading..</p>} */}
          </Form>
        </Col>
      </Row>
      <Row className="review">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Variants</h2>
          {product?.variant.length === 0 && <p>No Variants</p>}
          <ListGroup variant="flush">
            {product?.variant.map((v) => (
              <ListGroup.Item key={v._id}>
                <Row>
                  <Col>
                    {" "}
                    <p>
                      stock: <strong>{v.stock}</strong>
                    </p>
                    <p>
                      price: <strong>{v.price}</strong>
                    </p>
                    <p>
                      size: <strong>{v.size}</strong>
                    </p>
                    <p>
                      color: <strong>{v.color}</strong>
                    </p>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      className="btn-sm m-2"
                      onClick={() => navigate(`/variant/${v._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm m-2"
                      onClick={() => deleteHandler(v._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {loading && <p>Loading....</p>}
            <ListGroup.Item>
              <h2>Add A New Variant</h2>

              {loadingProductReview && <p>Loading....</p>}

              <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                  <Form.Label>Stcok</Form.Label>
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

                <Button
                  disabled={loadingProductReview}
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default EditProductScreen;
