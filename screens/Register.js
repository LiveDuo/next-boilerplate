import React, { useRef, useState, useCallback } from "react";

import { Box, Button, Input, Link } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

import axios from "../config/http";

import { useSimpleDispatch } from "simple-redux-js";

import { isEmail } from "../config/utilities";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";

import { identify } from "../config/track";

const Register = () => {
  const history = useHistory();
  const simpleDispatch = useSimpleDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameValid = !!name;
  const surnameValid = !!surname;
  const emailValid = isEmail(email);
  const passwordValid = password.length >= 8;

  const passwordRef = useRef();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const register = async () => {
    const { data } = await axios.post(`/api/auth/register`, {
      name,
      surname,
      email,
      password
    });
    localStorage.setItem("token", data.token);
    simpleDispatch("token", data.token);

    identify(data.token);
  };
  return (
    <Box width="200px" margin="0 auto" marginTop="80px" textAlign="center">
      <FormControl marginBottom="8px" isInvalid={name !== "" && !nameValid}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <FormErrorMessage>Name is invalid</FormErrorMessage>
      </FormControl>
      <FormControl
        marginBottom="8px"
        isInvalid={surname !== "" && !surnameValid}
      >
        <Input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
        />
        <FormErrorMessage>Surname is invalid</FormErrorMessage>
      </FormControl>
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
          ref={passwordRef}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          onBlur={() => forceUpdate()}
        />
        {passwordRef.current !== document.activeElement && (
          <FormErrorMessage>Password is invalid</FormErrorMessage>
        )}
      </FormControl>
      <Button
        colorScheme="teal"
        width="100%"
        marginBottom="16px"
        onClick={() => register()}
        disabled={!nameValid || !surnameValid || !emailValid || !passwordValid}
      >
        Register
      </Button>
      <Link onClick={() => history.push("/login")}>
        Already have an account?
      </Link>
    </Box>
  );
};

export default Register;
