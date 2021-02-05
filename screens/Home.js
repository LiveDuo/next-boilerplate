import React, { useEffect, useState } from "react";

import { Box, Heading, Text, Button, IconButton } from "@chakra-ui/react";

import { useSimpleDispatch } from "simple-redux-js";

import axios from "../config/http";

import { loadStripe } from "@stripe/stripe-js";

import { CloseIcon } from "@chakra-ui/icons";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Home = () => {
  const simpleDispatch = useSimpleDispatch();
  const [user, setUser] = useState([]);
  const [session, setSession] = useState([]);
  useEffect(() => {
    getUser();
    getSession();
  }, []);
  const getUser = async () => {
    const { data } = await axios.get(`/api/auth/user`);
    setUser(data);
  };
  const logout = async () => {
    simpleDispatch("token", null);
    localStorage.removeItem("token");
  };
  const getSession = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    if (sessionId && sessionId !== "null") {
      const { data } = await axios.get(
        "/api/billing/session?sessionId=" + sessionId
      );
      setSession(data);
      console.log(data);
    }
  };
  const checkout = async () => {
    const { data } = await axios.get(`/api/billing/checkout`);
    const stripe = await stripePromise;
    // doesn't work in codesandbox embedded browser only in a new tab
    await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });
  };
  const billingPortal = async () => {
    const params = session ? `?customerId=${session.customer}` : ``;
    const { data } = await axios.get(`/api/billing/portal${params}`);
    window.location.href = data.url;
  };
  return (
    <Box className="App">
      <Heading size="lg" marginBottom="16px">
        User
        <IconButton
          marginLeft="8px"
          fontSize="12px"
          icon={<CloseIcon />}
          onClick={() => logout()}
        >
          Logout
        </IconButton>
      </Heading>
      {user && (
        <Box>
          <Text>name: {user.name}</Text>
          <Text>surname: {user.surname}</Text>
          <Text>email: {user.email}</Text>
        </Box>
      )}
      {user.subscriptionStatus === "active" || session.customer ? (
        <Button onClick={() => billingPortal()}>Billing</Button>
      ) : (
        <Button onClick={() => checkout()}>Upgrade</Button>
      )}
    </Box>
  );
};

export default Home;
