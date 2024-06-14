import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveMethod } from "../slices/cartSlice";

const MethodScreen = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("Delivery");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveMethod(method));
    navigate("/details");
  };

  return (
    <FormContainer>
      <h1>Delivery Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Delivery"
              id="Delivery"
              name="method"
              value="Delivery"
              checked
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              className="my-2"
              label="Store PickUp"
              type="radio"
              id="PayPal"
              name="method"
              value="Pickup"
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default MethodScreen;
