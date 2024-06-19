import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useProfileMutation,
  useGetUserByIDQuery,
} from "../../slices/usersApiSlice";
import { Link, useParams } from "react-router-dom";

function EditUserScreen() {
  const { id: userId } = useParams();
  const { data: user } = useGetUserByIDQuery(userId);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        id: userId,
        firstname,
        lastname,
        email,
        dob,
        phone,
      }).unwrap();
      window.alert("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setDob(user.dob);
      setPhone(user.phone);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
      setAddress(user.address);
      setCity(user.city);
      setPin(user.pin);
      setState(user.state);
      setCountry(user.country);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/users">
        <Button variant="primary">Go Back</Button>
      </Link>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>User Account</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="lastname">
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
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
            <Form.Group className="my-2" controlId="email1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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

export default EditUserScreen;
