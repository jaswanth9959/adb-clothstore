import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`http://localhost:5000${product.image}`} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Card.Text as="p">
            By <strong>{product.brand}</strong>
          </Card.Text>
        </Card.Text>
        <Card.Text as="div">
          <Card.Text as="p">
            category : <strong>{product.category.name}</strong>
          </Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
