import React, { useState } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../backend/axios";

import { Stack } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form_data, setFormData] = useState({});

  let SubmitForm = (e) => {
    e.preventDefault();
    setIsRegistering(true);

    if (form_data.con != form_data.pas) {
      alert("ayos password par");
    } else {
      axios
        .post("register.php", form_data)
        .then((res) => {
          if (res.data.status == 200) {
            alert(res.data.message);
            navigate("/");
          } else {
            alert(res.data.message);
            setIsRegistering(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setIsRegistering(false);
        });
    }
  };

  const setData = (e) => {
    setFormData({ ...form_data, [e.target.name]: e.target.value });
  };

  return (
    <div className="reg_bg">
      <div className="left"></div>
      <div className="right">
        <Form onSubmit={SubmitForm}>
          <h1>Create Account</h1>
          <Stack gap={2}>
            <Form.Group controlId="input_email">
              <Form.Control
                type="email"
                name="eml"
                placeholder="*NUD Email"
                pattern=".+@students.nu-dasma.edu.ph|.+@employees.nu-dasma.edu.ph"
                onInput={setData}
                required
              />
            </Form.Group>
            <Form.Group controlId="input_pass">
              <Form.Control
                type="password"
                name="pas"
                placeholder="*Password"
                minLength={8}
                onInput={setData}
                required
              />
            </Form.Group>
            <Form.Group controlId="input_cpass">
              <Form.Control
                type="password"
                placeholder="*Confirm Password"
                name="con"
                onInput={setData}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="btn_submit"
              type="submit"
              disabled={isRegistering}
            >
              Register
            </Button>
          </Stack>

          <p className="mt-2">
            Already registered? <Link to={"/"}>Log In</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
