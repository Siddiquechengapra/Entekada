import React, { useContext, useEffect, useReducer } from "react";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Store } from "../utils/StoreProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils/Utils";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";

export default function OrderScreen() {
  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderID } = params;

  const { userInfo } = ctxState;
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          order: action.payload,
          error: "",
        };
      case "FETCH_FAIL":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/order/${orderID}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }
    if (!order._id || (order._id && order._id !== orderID)) {
      fetchOrder();
    }
  }, [order, userInfo, orderID, navigate]);
  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Error variant="danger">{error}</Error>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderID}</title>
      </Helmet>
      <h1 className="my-3">Order {orderID}</h1>
      <Link style={{ textDecoration: "none" }} to={`/orders`}>
        See all orders
      </Link>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name :</strong>
                {order.shippingAddress.fullName} <br />
                <strong>Address :</strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city} ,
                {order.shippingAddress.postalcode} ,
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <Error variant="success">
                  Delivered at {order.deliveredAt}
                </Error>
              ) : (
                <Error variant="danger">Not delivered</Error>
              )}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method</strong>
                {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <Error variant="success">Paid at {order.paidAt}</Error>
              ) : (
                <Error variant="danger">Not paid</Error>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <Loading />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <Loading />}
                  </ListGroup.Item>
                )} */}
                {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <Loading />}
                    <div className="d-grid">
                      <Button type="button" onClick={deliverOrderHandler}>
                        Deliver Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
