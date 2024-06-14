import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";

const DetailsScreen = () => {
  const cart = useSelector((state) => state.cart);
  const date = new Date(Date.now());
  date.setDate(date.getDate() + 1);

  const dt1 = date.toLocaleDateString("en-US");
  const date2 = new Date(Date.now());
  date2.setDate(date2.getDate() + 2);

  const dt2 = date2.toLocaleDateString("en-US");

  const [time, setTime] = useState("");
  const [dt, setDt] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress(
        address + " " + city + " " + postalCode + " " + country
      )
    );
    navigate("/payment");
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(dt + " " + time));
    navigate("/payment");
  };
  return (
    <FormContainer>
      {cart.method === "Delivery" ? (
        <>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </>
      ) : (
        <>
          <h2>Choose PickUp Date And Time</h2>
          <Form onSubmit={submitHandler2}>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Date</Form.Label>
              <Form.Control
                as="select"
                value={dt}
                onChange={(e) => setDt(e.target.value)}
              >
                <option>Select</option>
                <option value={dt1}>{dt1}</option>
                <option value={dt2}>{dt2}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Time</Form.Label>
              <Form.Control
                as="select"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option>Select</option>

                <option value={"10:00AM"}>10:00 AM</option>
                <option value={"11:00AM"}>11:00 AM</option>
                <option value={"12:00AM"}>12:00 AM</option>
                <option value={"01:00PM"}>01:00 PM</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default DetailsScreen;
