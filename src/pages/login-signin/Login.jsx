import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Button from "@mui/material/Button";

export default function Login() {
  return (
    <div className="login_bg">
      <div className="left">
        <Form>
          <h1>Sign In</h1>
          {/* <Button className="text-black" variant="outline-secondary">
            Sign up with Google
          </Button>
          <Form.Text>or use your account</Form.Text> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter" />
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
