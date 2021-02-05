import React, { useState } from "react";

import { Box, Button, Input, Link } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

import axios from "../config/http";

import { useSimpleDispatch } from "simple-redux-js";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";

import { isEmail } from "../config/utilities";

import { identify } from "../config/track";

const Login = () => {
  const history = useHistory();
  const simpleDispatch = useSimpleDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = isEmail(email);
  const passwordValid = password.length >= 8;

  const login = async () => {
    const { data } = await axios.post(`/api/auth/login`, { email, password });
    simpleDispatch("token", data.token);
    localStorage.setItem("token", data.token);
    history.push("/");

    identify(data.token);
  };
  return (
    <Box width="200px" margin="0 auto" marginTop="80px" textAlign="center">
      <FormControl marginBottom="8px" isInvalid={email !== "" && !emailValid}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <FormErrorMessage>Email is invalid</FormErrorMessage>
      </FormControl>
      <FormControl
        marginBottom="16px"
        isInvalid={password !== "" && !passwordValid}
      >
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <FormErrorMessage>Password is invalid</FormErrorMessage>
      </FormControl>
      <Button
        colorScheme="teal"
        width="100%"
        marginBottom="16px"
        onClick={() => login()}
        disabled={!emailValid || !passwordValid}
      >
        Login
      </Button>
      <Link onClick={() => history.push("/register")}>
        Don't have an account?
      </Link>
    </Box>
  );
};

export default Login;
