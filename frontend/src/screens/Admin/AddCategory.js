import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAddCategoryMutation } from "../../slices/categoryApiSlice";
import { useNavigate, Link } from "react-router-dom";
function AddCategory() {
  const [name, setName] = useState("");

  const [createCat, { isLoading: loadingUpdate }] = useAddCategoryMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createCat({
        name,
      }).unwrap();
      window.alert("Category created");
      navigate("/admin/categories");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/categories">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Add Category </h2>
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

            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddCategory;
