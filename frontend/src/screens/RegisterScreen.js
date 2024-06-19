import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function RegisterScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          firstname,
          lastname,
          email,
          password,
          phone,
          address,
          city,
          state,
          pin,
          country,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 style={{ color: "black" }} className="text-center">
        Sign Up
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname">
          <Form.Label>last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/DD/YYYY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname22">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname233">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname22222">
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastna">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastnamegggg">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign Up
        </Button>

        {isLoading && <h2>Loading..</h2>}
      </Form>

      <Row className="py-3">
        <Col>
          Existing Customer? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
