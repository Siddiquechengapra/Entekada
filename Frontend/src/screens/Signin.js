import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";

import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";

export default function Signin() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <div className="signin">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1>Sign in</h1>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
          <Button type="submit">Sign in</Button>
          <div className="mb-3">
            New customer ? {""}{" "}
            <Link to={`/signup?redirect=${redirect}`}>create your account</Link>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
