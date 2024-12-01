import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  return (
    <div className="login_bg">
      <div className="left">
        <Form>
          <h1>Sign In</h1>
          {/* <p className="m-0 text-secondary">or use your account</p> */}
          <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" className="btn_submit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="right"></div>
    </div>
  );
}
