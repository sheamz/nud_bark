import React from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  let SubmitForm = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="reg_bg">
      <div className="left"></div>
      <div className="right">
        <Form onSubmit={SubmitForm}>
          <h1>Create Account</h1>
          <Form.Group className="mb-3" controlId="input_fname">
            <Form.Control type="text" placeholder="*Firstname" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="input_mname">
            <Form.Control type="text" placeholder="Middlename" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="input_lname">
            <Form.Control type="text" placeholder="*Lastname" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="input_email">
            <Form.Control type="email" placeholder="*Email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="input_pass">
            <Form.Control type="password" placeholder="*Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="input_cpass">
            <Form.Control
              type="password"
              placeholder="*Confirm Password"
              required
            />
          </Form.Group>
          <Button variant="primary" className="btn_submit" type="submit">
            Register
          </Button>
          <p className="mt-3">
            Already registered? <Link to={"/"}>Log In</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
