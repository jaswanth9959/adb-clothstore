import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
function AddProductScreen() {
  const { data: categories } = useGetCategoriesQuery();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [si, setSi] = useState("");
  const [price, setPrice] = useState("");
  const [st, setSt] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [createProduct, { isLoading: loadingUpdate }] =
    useCreateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    const size = si.split(",").map((o) => o.trim());
    const stock = st.split(",").map((o) => Number(o.trim()));
    e.preventDefault();
    try {
      await createProduct({
        userId: userInfo.user._id,
        name,
        image,
        brand,
        category,
        description,
        size,
        stock,
        color,
        price,
      }).unwrap();
      window.alert("Product created");
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

  return (
    <>
      <Link to="/admin/products">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Add Product </h2>
          {loadingUpdate && <p>Loading...</p>}
          <Form onSubmit={submitHandler}>
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
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
                {/* <option value={"shirt"}>Shirt</option>
                <option value={"bottoms"}>Buttoms</option>
                <option value={"sweater"}>Sweater</option>
                <option value={"cap"}>Cap</option>
                <option value={"Outerwear"}>Outerwear</option> */}
              </Form.Control>
              {/* <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control> */}
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

            <Form.Group className="my-2" controlId="email11">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email121">
              <Form.Label>Size Variants</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sizes"
                value={si}
                onChange={(e) => setSi(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email132">
              <Form.Label>Stock of Variants</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Stock of variants"
                value={st}
                onChange={(e) => setSt(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email12323">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddProductScreen;
