import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../Components/CheckoutSteps'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


import { Store } from "../utils/StoreProvider";
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';


export default function PlaceOrder() {
    const { state: ctxstate, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = ctxstate
    const navigate = useNavigate();


    const placeOrderHandler = (e) => {
        e.preventDefault()
    }

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100 //123.245=>123.23
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
    cart.taxPrice = round2(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment")
        }
    })
    return (
        <div><CheckoutSteps step1 step2 step3 step4 />
            <Helmet><title>Place order</title></Helmet>
            <h1 className="my-3">Preview Order</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name: </strong>{cart.shippingAddress.fullname}<br />
                                <strong>Address: </strong>{cart.shippingAddress.address},{cart.shippingAddress.city},
                                {cart.shippingAddress.postalcode},{cart.shippingAddress.country}

                            </Card.Text>
                            <Link style={{ "text-decoration": "none" }} to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong>{cart.paymentMethod}
                            </Card.Text>
                            <Link style={{ "text-decoration": "none" }} to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>

                    {/* cart items */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Cart items</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                        </Col>
                                        <Col md={3}><span>Quantity</span></Col>
                                        <Col md={3}><span>Price</span></Col>
                                    </Row>
                                </ListGroup.Item>
                                {
                                    cart.cartItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <img className='img-fluid rounded img-thumbnail' src={item.image} alt={item.name}></img>
                                                    <Link style={{ "text-decoration": "none", "margin-left": "20px" }} to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}><span>{item.quantity}</span></Col>
                                                <Col md={3}><span>${item.price}</span></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <Link style={{ "text-decoration": "none" }} to="/payment">Edit Cart</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax price</Col>
                                        <Col>${cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Total</Col>
                                        <Col>${cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>
                                            Place Order
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row></div>
    )
}
