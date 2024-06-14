import { Table, Button, Row, Col } from "react-bootstrap";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { Link } from "react-router-dom";
function UsersScreen() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  return (
    <div>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2>All Users</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>DOB</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.dob}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/users/${user._id}`}
                        className="btn-sm"
                        variant="primary"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default UsersScreen;
