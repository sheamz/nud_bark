import React, { useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../backend/axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const cookie = new Cookies();

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [form_data, setFormData] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...form_data, [e.target.name]: e.target.value });
  };

  let SubmitForm = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    axios
      .post("/login.php", form_data)
      .then((res) => {
        if (res.data.status == 200) {
          cookie.set("atk", res.data.atk, {
            expires: new Date(Date.now() + 86400 * 1000),
            secure: true,
          });
          alert(res.data.message);

          let role = jwtDecode(res.data.atk).rol;

          if (role == "user") {
            navigate("/home");
          } else {
            navigate("/dashboard");
          }
        } else {
          alert(res.data.message);
          setIsLoggingIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoggingIn(false);
      });
  };

  return (
    <div className="login_bg">
      <div className="left">
        <Form onSubmit={SubmitForm}>
          <h1>Log In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="pass"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            className="btn_submit"
            type="submit"
            disabled={isLoggingIn}
          >
            Log In
          </Button>
          <p className="mt-3">
            Not registered yet? Register <Link to={"/register"}>here</Link>
          </p>
        </Form>
      </div>
      <div className="right"></div>
    </div>
  );
}
