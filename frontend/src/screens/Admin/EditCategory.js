import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../slices/categoryApiSlice";
import { useNavigate, Link, useParams } from "react-router-dom";
function EditCategory() {
  const { id: catId } = useParams();
  const [name, setName] = useState("");
  const { data: category } = useGetCategoryQuery(catId);
  const [updateCat, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCat({
        catId,
        name,
      }).unwrap();
      window.alert("Category updated");
      navigate("/admin/categories");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  return (
    <>
      <Link to="/admin/categories">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Edit Category </h2>
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
              Edit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default EditCategory;
