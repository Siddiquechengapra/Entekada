import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <div className="prodinfo">
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating numReviews={product.numReviews} rating={product.rating} />
          <Card.Text>${product.price}</Card.Text>
          <Button>Add to cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
