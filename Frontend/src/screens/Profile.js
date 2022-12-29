import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../utils/StoreProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils/Utils";



export default function Profile() {
  const { search } = useLocation();
  const [edit, setEdit] = useState(false);
  const { state: ctxstate, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = ctxstate
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const navigate = useNavigate();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/profileedit", {
        name,
        email,
      }, {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        }
      });

      ctxDispatch({ type: "USER_EDIT", payload: data });
      toast.success("Profile edited");
      setEdit(!edit)


      // navigate(redirect);
    } catch (err) {
      toast.error(getError(err.response.data));
    }

  };

  const onEdit = () => {
    setEdit(!edit)
  }
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect || "/")
    }
  }, [userInfo])


  return (
    <div className="signin">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1>User Profile</h1>
      {!edit &&
        <Form >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              required
              value={userInfo.name}
              disabled={true}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              value={userInfo.email}
              disabled={true}
            />
            <Button className="mt-3" onClick={onEdit}>
              Edit
            </Button>
            {/* <div className="mb-3">
              New customer ? {""}{" "}
              <Link to={`/signup?redirect=${redirect}`}>create your account</Link>
            </div> */}
          </Form.Group>
        </Form>}
      {edit &&
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Button className="mt-3" type="submit" >
              Submit
            </Button>
            {/* <div className="mb-3">
              New customer ? {""}{" "}
              <Link to={`/signup?redirect=${redirect}`}>create your account</Link>
            </div> */}
          </Form.Group>
        </Form>}
    </div>
  );
}
