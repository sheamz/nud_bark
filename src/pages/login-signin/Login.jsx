import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();
  let SubmitForm = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login_bg">
      <div className="left">
        <Form onSubmit={SubmitForm}>
          <h1>Log In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Button variant="primary" className="btn_submit" type="submit">
            Log In
          </Button>
          <p className="mt-3">
            Not registered yet? Register <Link to={"register"}>here</Link>
          </p>
        </Form>
      </div>
      <div className="right"></div>
    </div>
  );
}
