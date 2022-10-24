import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./utils/StoreProvider";
import Badge from "react-bootstrap/Badge";

function App() {
  const { state: ctxState, dispatch: ctxDispath } = useContext(Store);

  return (
    <BrowserRouter>
      <div className=" d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Entekada</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Nav.Link href="/cart">
                  Cart
                  <Badge bg="danger">{ctxState.cart.cartItems.length}</Badge>
                </Nav.Link>
              </Nav>
              {/* <Nav className="me-auto">
                <h1>{`cart ${ctxState.cart.cartItems.length}`}</h1>
              </Nav> */}
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
